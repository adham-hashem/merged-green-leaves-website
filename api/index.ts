import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Helper to parse connection string format: Host=...;Database=...;Username=...;Password=...;Port=...
function parseConnectionString(str: string) {
  if (str.startsWith('postgresql://') || str.startsWith('postgres://')) {
    return { connectionString: str };
  }
  const config: any = {};
  str.split(';').forEach(pair => {
    const idx = pair.indexOf('=');
    if (idx !== -1) {
      const key = pair.substring(0, idx).trim().toLowerCase();
      const value = pair.substring(idx + 1).trim();
      if (key === 'host') config.host = value;
      else if (key === 'database') config.database = value;
      else if (key === 'username' || key === 'user') config.user = value;
      else if (key === 'password') config.password = value;
      else if (key === 'port') config.port = parseInt(value, 10);
    }
  });
  return config;
}

const dbConnectionString = process.env.DB_CONNECTION_STRING || "Host=localhost;Database=leaves_db;Username=postgres;Password=postgres;Port=5432";
const poolConfig = parseConnectionString(dbConnectionString);

if (
  (poolConfig.host && poolConfig.host !== 'localhost' && poolConfig.host !== '127.0.0.1') ||
  (poolConfig.connectionString && !poolConfig.connectionString.includes('localhost') && !poolConfig.connectionString.includes('127.0.0.1'))
) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

// Initialize Supabase Client for file uploads
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Multer in-memory storage configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Configure CORS to allow frontend requests
app.use(cors({
  origin: (origin, callback) => {
    // Allow local dev and Vercel domains
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1') || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback to allow client origin
    }
  },
  credentials: true
}));

app.use(express.json());

// Database Initialization & Seeding
let isDbInitialized = false;
async function initDb() {
  if (isDbInitialized) return;
  const client = await pool.connect();
  try {
    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        password_hash VARCHAR(500) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(1000),
        icon_name VARCHAR(50) NOT NULL,
        display_order INTEGER NOT NULL,
        is_active BOOLEAN NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_services_is_active_display_order ON services(is_active, display_order);
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        email VARCHAR(150) NOT NULL,
        address VARCHAR(500) NOT NULL,
        service VARCHAR(150) NOT NULL,
        budget VARCHAR(50) NOT NULL,
        notes VARCHAR(2000),
        image_url VARCHAR(1000),
        status VARCHAR(50) DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
      CREATE INDEX IF NOT EXISTS idx_bookings_status_created_at ON bookings(status, created_at DESC);
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS before_after_projects (
        id UUID PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(2000),
        before_image_url VARCHAR(1000),
        after_image_url VARCHAR(1000),
        before_video_url VARCHAR(1000),
        after_video_url VARCHAR(1000),
        media_type VARCHAR(20) DEFAULT 'image' NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_projects_created_at ON before_after_projects(created_at);
      CREATE INDEX IF NOT EXISTS idx_projects_media_type_created_at ON before_after_projects(media_type, created_at DESC);
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY,
        type VARCHAR(50) DEFAULT 'booking' NOT NULL,
        title VARCHAR(150) NOT NULL,
        message VARCHAR(1000) NOT NULL,
        is_read BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
      CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
    `);

    // Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@greenleaves.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123';
    const adminRes = await client.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
    if (adminRes.rowCount === 0) {
      const hash = await bcrypt.hash(adminPassword, 10);
      await client.query('INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)', [crypto.randomUUID(), adminEmail, hash]);
      console.log('Seeded default admin user:', adminEmail);
    } else {
      const hash = await bcrypt.hash(adminPassword, 10);
      await client.query('UPDATE users SET password_hash = $1 WHERE email = $2', [hash, adminEmail]);
    }

    // Seed default services
    const servicesRes = await client.query('SELECT * FROM services');
    if (servicesRes.rowCount === 0) {
      const defaultServices = [
        { title: "Landscaping", description: "Professional landscape design and installation.", icon_name: "Leaf", display_order: 1, is_active: true },
        { title: "Fencing", description: "High-quality perimeter and decorative fencing solutions.", icon_name: "Scissors", display_order: 2, is_active: true },
        { title: "Turfing", description: "Premium turf laying for beautiful, instant lawns.", icon_name: "TreeDeciduous", display_order: 3, is_active: true },
        { title: "Patios", description: "Custom patio design and paving installation.", icon_name: "Layer", display_order: 4, is_active: true },
        { title: "Tree Surgery", description: "Expert tree felling, pruning, and maintenance.", icon_name: "TreeDeciduous", display_order: 5, is_active: true },
        { title: "Hedges & Shrubs", description: "Precise hedge trimming and shrub maintenance.", icon_name: "Scissors", display_order: 6, is_active: true },
        { title: "Grass Cutting", description: "Regular or one-off professional lawn mowing.", icon_name: "Leaf", display_order: 7, is_active: true },
        { title: "Garden Clearance", description: "Thorough overgrown garden clearing and waste disposal.", icon_name: "Shovel", display_order: 8, is_active: true },
        { title: "Commercial Sites", description: "Grounds maintenance and landscaping for businesses.", icon_name: "Mountain", display_order: 9, is_active: true }
      ];

      for (const s of defaultServices) {
        await client.query(
          'INSERT INTO services (id, title, description, icon_name, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6)',
          [crypto.randomUUID(), s.title, s.description, s.icon_name, s.display_order, s.is_active]
        );
      }
      console.log('Default services seeded successfully.');
    }
    isDbInitialized = true;
  } catch (err) {
    console.error('Error during DB init/seeding:', err);
  } finally {
    client.release();
  }
}

// Middleware to initialize database connection dynamically (especially on Vercel cold starts)
app.use(async (req, res, next) => {
  try {
    await initDb();
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required.' });
  }

  const jwtSecret = process.env.JWT_SECRET || 'super_secret_key_for_cambridge_green_leaves_web_api_2026_dev_env';
  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired authorization token.' });
    }
    req.user = user;
    next();
  });
};

/* ==========================================================================
   AUTHENTICATION ENDPOINTS
   ========================================================================== */

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'super_secret_key_for_cambridge_green_leaves_web_api_2026_dev_env';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'Admin' },
      jwtSecret,
      {
        expiresIn: '7d',
        issuer: process.env.JWT_ISSUER || 'CamApi',
        audience: process.env.JWT_AUDIENCE || 'CamFrontend'
      }
    );

    return res.json({
      isAuthenticated: true,
      token,
      email: user.email
    });
  } catch (error: any) {
    console.error('Authentication Error in /api/auth/login:', error);
    return res.status(500).json({ message: error.message });
  }
});

/* ==========================================================================
   SERVICES ENDPOINTS
   ========================================================================== */

app.get('/api/services', async (req, res) => {
  const activeOnly = req.query.activeOnly === 'true';
  try {
    const query = activeOnly
      ? 'SELECT * FROM services WHERE is_active = TRUE ORDER BY display_order'
      : 'SELECT * FROM services ORDER BY display_order';
    const result = await pool.query(query);
    return res.json(result.rows);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    return res.json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/api/services', authenticateToken, async (req, res) => {
  const { title, description, icon_name, display_order, is_active } = req.body;
  if (!title || !icon_name || display_order === undefined || is_active === undefined) {
    return res.status(400).json({ message: 'Title, icon_name, display_order, and is_active are required.' });
  }

  try {
    const id = crypto.randomUUID();
    const result = await pool.query(
      'INSERT INTO services (id, title, description, icon_name, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, title, description || '', icon_name, display_order, is_active]
    );
    return res.status(211).json(result.rows[0]); // C# returns CreatedAtAction (mapped as 201 Created or 200)
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.put('/api/services/:id', authenticateToken, async (req, res) => {
  const { title, description, icon_name, display_order, is_active } = req.body;
  if (!title || !icon_name || display_order === undefined || is_active === undefined) {
    return res.status(400).json({ message: 'Title, icon_name, display_order, and is_active are required.' });
  }

  try {
    const result = await pool.query(
      'UPDATE services SET title = $1, description = $2, icon_name = $3, display_order = $4, is_active = $5 WHERE id = $6 RETURNING *',
      [title, description || '', icon_name, display_order, is_active, req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM services WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

/* ==========================================================================
   BOOKINGS ENDPOINTS
   ========================================================================== */

app.get('/api/bookings', authenticateToken, async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page as string, 10) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : null;
  const status = req.query.status as string;

  try {
    let queryText = 'SELECT * FROM bookings';
    let countQueryText = 'SELECT COUNT(*) FROM bookings';
    const queryParams: any[] = [];
    const countParams: any[] = [];

    if (status && status !== 'all') {
      queryText += ' WHERE status = $1';
      countQueryText += ' WHERE status = $1';
      queryParams.push(status);
      countParams.push(status);
    }

    queryText += ' ORDER BY created_at DESC';

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      const countRes = await pool.query(countQueryText, countParams);
      const totalCount = parseInt(countRes.rows[0].count, 10);

      queryText += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
      queryParams.push(pageSize, offset);

      const itemsRes = await pool.query(queryText, queryParams);
      res.setHeader('X-Pagination-Total-Count', totalCount.toString());
      res.setHeader('Access-Control-Expose-Headers', 'X-Pagination-Total-Count');
      return res.json({ items: itemsRes.rows, totalCount });
    } else {
      const result = await pool.query(queryText, queryParams);
      return res.json(result.rows);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/api/bookings/stats', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
        COUNT(*) FILTER (WHERE status = 'completed') as completed
      FROM bookings
    `);
    const stats = result.rows[0];
    return res.json({
      totalBookings: parseInt(stats.total || 0, 10),
      pendingJobs: parseInt(stats.pending || 0, 10),
      completedJobs: parseInt(stats.completed || 0, 10),
      contactedCustomers: parseInt(stats.contacted || 0, 10)
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    return res.json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Helper to send message to Telegram admin chat with automatic retries
async function sendTelegramNotification(booking: any, attempt = 1, maxAttempts = 3) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId) {
    console.log('[Telegram Notifier] Bot Token or Chat ID not configured. Skipping notification.');
    return;
  }

  const notesText = booking.notes ? booking.notes.trim() : 'None';
  const imageUrlText = booking.image_url ? `📎 <a href="${booking.image_url}">View Attachment</a>` : 'None';

  const message = `🌳 <b>New Booking Received!</b> 🌳\n\n` +
                  `👤 <b>Client:</b> ${booking.full_name}\n` +
                  `📞 <b>Phone:</b> ${booking.phone_number}\n` +
                  `✉️ <b>Email:</b> ${booking.email}\n` +
                  `📍 <b>Address:</b> ${booking.address}\n` +
                  `🛠 <b>Service:</b> ${booking.service}\n` +
                  `💰 <b>Budget:</b> ${booking.budget}\n` +
                  `📝 <b>Notes:</b> ${notesText}\n` +
                  `🖼️ <b>Image:</b> ${imageUrlText}\n\n` +
                  `📅 <i>Submitted at: ${new Date(booking.created_at).toLocaleString('en-GB')}</i>`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errText}`);
    }

    const resData: any = await response.json();
    if (!resData.ok) {
      throw new Error(`API responded with ok=false: ${JSON.stringify(resData)}`);
    }

    console.log('[Telegram Notifier] Notification sent successfully to admin.');
  } catch (error: any) {
    console.error(`[Telegram Notifier] Error (Attempt ${attempt}/${maxAttempts}):`, error.message || error);

    if (attempt < maxAttempts) {
      const delay = attempt * 2000; // 2 seconds, then 4 seconds delay
      console.log(`[Telegram Notifier] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return sendTelegramNotification(booking, attempt + 1, maxAttempts);
    } else {
      console.error('[Telegram Notifier] Max attempts reached. Notification failed.');
    }
  }
}

app.post('/api/bookings', async (req, res) => {
  const { full_name, phone_number, email, address, service, budget, notes, image_url } = req.body;
  if (!full_name || !phone_number || !email || !address || !service || !budget) {
    return res.status(400).json({ message: 'Full name, phone, email, address, service, and budget are required.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const id = crypto.randomUUID();
    const bookingRes = await client.query(
      `INSERT INTO bookings (id, full_name, phone_number, email, address, service, budget, notes, image_url, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [id, full_name, phone_number, email, address, service, budget, notes || '', image_url || null, 'pending', new Date()]
    );

    // Auto-create notification
    const notificationId = crypto.randomUUID();
    await client.query(
      `INSERT INTO notifications (id, type, title, message, is_read, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [notificationId, 'booking', 'New Booking Received', `${full_name} booked ${service}`, false, new Date()]
    );

    await client.query('COMMIT');

    // Trigger Telegram notification in the background (does not block client response)
    const newBooking = bookingRes.rows[0];
    sendTelegramNotification(newBooking).catch(err => {
      console.error('[Telegram Notifier] Background exception in notification queue:', err);
    });

    return res.status(201).json(newBooking);
  } catch (error: any) {
    await client.query('ROLLBACK');
    return res.status(500).json({ message: error.message });
  } finally {
    client.release();
  }
});

app.put('/api/bookings/:id', authenticateToken, async (req, res) => {
  const { full_name, phone_number, email, address, service, budget, notes, status } = req.body;
  if (!full_name || !phone_number || !email || !address || !service || !budget || !status) {
    return res.status(400).json({ message: 'Required fields missing for update.' });
  }

  try {
    const result = await pool.query(
      `UPDATE bookings SET full_name = $1, phone_number = $2, email = $3, address = $4, service = $5,
       budget = $6, notes = $7, status = $8 WHERE id = $9 RETURNING *`,
      [full_name, phone_number, email, address, service, budget, notes || '', status, req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.patch('/api/bookings/:id/status', authenticateToken, async (req, res) => {
  const status = req.body;
  if (status !== 'pending' && status !== 'contacted' && status !== 'completed') {
    return res.status(400).json({ message: "Status must be 'pending', 'contacted', or 'completed'." });
  }

  try {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM bookings WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

/* ==========================================================================
   BEFORE & AFTER PROJECTS ENDPOINTS
   ========================================================================== */

app.get('/api/beforeafterprojects', async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page as string, 10) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : null;
  const mediaType = req.query.mediaType as string;

  try {
    let queryText = 'SELECT * FROM before_after_projects';
    let countQueryText = 'SELECT COUNT(*) FROM before_after_projects';
    const queryParams: any[] = [];
    const countParams: any[] = [];

    if (mediaType === 'images') {
      queryText += " WHERE media_type = 'image' OR media_type = 'both'";
      countQueryText += " WHERE media_type = 'image' OR media_type = 'both'";
    } else if (mediaType === 'videos') {
      queryText += " WHERE media_type = 'video' OR media_type = 'both'";
      countQueryText += " WHERE media_type = 'video' OR media_type = 'both'";
    }

    queryText += ' ORDER BY created_at DESC';

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      const countRes = await pool.query(countQueryText, countParams);
      const totalCount = parseInt(countRes.rows[0].count, 10);

      queryText += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
      queryParams.push(pageSize, offset);

      const itemsRes = await pool.query(queryText, queryParams);
      res.setHeader('X-Pagination-Total-Count', totalCount.toString());
      res.setHeader('Access-Control-Expose-Headers', 'X-Pagination-Total-Count');
      return res.json({ items: itemsRes.rows, totalCount });
    } else {
      const result = await pool.query(queryText, queryParams);
      return res.json(result.rows);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/api/beforeafterprojects/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM before_after_projects WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    return res.json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/api/beforeafterprojects', authenticateToken, async (req, res) => {
  const { title, description, before_image_url, after_image_url, before_video_url, after_video_url, media_type } = req.body;
  if (!title || !before_image_url || !after_image_url) {
    return res.status(400).json({ message: 'Title, before image, and after image are required.' });
  }

  try {
    const id = crypto.randomUUID();
    const result = await pool.query(
      `INSERT INTO before_after_projects (id, title, description, before_image_url, after_image_url,
       before_video_url, after_video_url, media_type, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [id, title, description || '', before_image_url, after_image_url, before_video_url || '', after_video_url || '', media_type || 'image', new Date()]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.put('/api/beforeafterprojects/:id', authenticateToken, async (req, res) => {
  const { title, description, before_image_url, after_image_url, before_video_url, after_video_url, media_type } = req.body;
  if (!title || !before_image_url || !after_image_url) {
    return res.status(400).json({ message: 'Title, before image, and after image are required.' });
  }

  try {
    const result = await pool.query(
      `UPDATE before_after_projects SET title = $1, description = $2, before_image_url = $3,
       after_image_url = $4, before_video_url = $5, after_video_url = $6, media_type = $7
       WHERE id = $8 RETURNING *`,
      [title, description || '', before_image_url, after_image_url, before_video_url || '', after_video_url || '', media_type || 'image', req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete('/api/beforeafterprojects/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM before_after_projects WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

/* ==========================================================================
   NOTIFICATIONS ENDPOINTS
   ========================================================================== */

app.get('/api/notifications', authenticateToken, async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page as string, 10) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : null;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;

  try {
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      const countRes = await pool.query('SELECT COUNT(*) FROM notifications');
      const totalCount = parseInt(countRes.rows[0].count, 10);

      const itemsRes = await pool.query(
        'SELECT * FROM notifications ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [pageSize, offset]
      );

      res.setHeader('X-Pagination-Total-Count', totalCount.toString());
      res.setHeader('Access-Control-Expose-Headers', 'X-Pagination-Total-Count');
      return res.json({ items: itemsRes.rows, totalCount });
    } else {
      const result = await pool.query(
        'SELECT * FROM notifications ORDER BY created_at DESC LIMIT $1',
        [limit]
      );
      return res.json(result.rows);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.patch('/api/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/api/notifications/read-all', authenticateToken, async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE');
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/api/notifications/push', (req, res) => {
  return res.json({ message: 'Push notification mock triggered.' });
});

/* ==========================================================================
   FILE UPLOAD ENDPOINT (INTEGRATING WITH SUPABASE STORAGE)
   ========================================================================== */

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const bucket = req.body.bucket || 'uploads';
  const customPath = req.body.path || '';

  try {
    if (!supabase) {
      return res.status(500).json({ message: 'Supabase Storage is not configured on the backend.' });
    }

    // Determine target path
    const fileExt = req.file.originalname.split('.').pop() || '';
    const cleanFileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = customPath
      ? (customPath.endsWith('/') ? `${customPath}${cleanFileName}` : customPath)
      : cleanFileName;

    // Upload to Supabase Storage bucket
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      });

    if (error) {
      return res.status(500).json({ message: `Supabase Storage upload error: ${error.message}` });
    }

    // Retrieve public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return res.json({ publicUrl: publicUrlData.publicUrl });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Export express app for Vercel Serverless Functions
export default app;

// Local development listening
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(`Cambridge Green Leaves Node Backend Dev Server`);
    console.log(`Running on: http://localhost:${port}`);
    console.log(`==================================================\n`);
  });
}
