# Cambridge Green Leaves - Site Map

Official Website Domain: [www.cambridgegreenleaves.co.uk](https://www.cambridgegreenleaves.co.uk)

## Public Website Structure

### Main Pages

#### 1. Homepage `/`
A clean, focused landing page showcasing the core business.

**Sections (Top to Bottom)**
- Header with Navigation
  - Logo (transparent borders)
  - Navigation Links: Home, Services, Book a Service, **Before & After**, Contact
  - Call Button: 07961228431

- Scrolling Announcement Bar
  - Positioned directly below the header to display high-priority updates.
  
- Hero Section
  - Large headline: "Professional Gardening Services in Cambridge"
  - Subheadline: "Transforming Gardens, Creating Beautiful Spaces"
  - Call-to-Action Buttons: "Book a Service" & "Call Now"
  - Beautiful garden background image

- Services Section
  - Grid of 6 service offerings:
    - Garden Design & Consultation
    - Landscape Installation
    - Maintenance & Care
    - Hard Landscaping
    - Planting & Flowers
    - Tree & Hedge Services
  - Icon + description for each

- Booking Form Section
  - Full name, email, phone, address inputs
  - Service type selection
  - Budget selection
  - Image upload capability
  - Notes field
  - Submit button

- Contact Section
  - Phone number with direct link
  - Address information
  - Business hours (if applicable)
  - Quick contact form

- Footer
  - Company info
  - Quick links
  - Contact information
  - Social media (if applicable)

---

#### 2. Before & After Gallery `/before-after`
A **completely independent, standalone portfolio page** showcasing all project transformations.

**Page Structure**
- Header with Navigation (same as homepage)
  - Allows seamless navigation between pages

- Hero Section (Custom for Gallery)
  - Large title: "Our Project Gallery"
  - Subtitle: "Explore the transformation of gardens..."
  - Back to Home link

- Gallery Grid
  - Responsive layout:
    - Mobile: 1 column
    - Tablet: 1-2 columns
    - Desktop: 2 columns
  
  - Each Project Card Contains:
    - **Image Comparison**:
      - Before image
      - After image (overlaid)
      - Draggable/touch slider to compare
      - Before/After labels
    
    - **OR Video Comparison** (for video projects):
      - Side-by-side video playback
      - Play/pause controls
      - Before/After labels
      - Blue "Video" badge
    
    - Project Details:
      - Title (e.g., "Garden Renovation")
      - Description
      - Hover effects showing transformation

- Footer (Inherited from layout)

**Key Features**
- Fully independent from homepage
- No homepage sections included
- Can be bookmarked/shared directly
- Full page experience with navigation

---

#### 3. Service Detail Page `/services/:id`
A dynamic service presentation page loaded via database lookup.

**Page Structure**
- Header with Navigation
- Banner Hero Section:
  - Custom service banner image (admin-uploaded or fallback banner)
  - Floating service icon and large title
  - Description and "Request Booking" button linking back to the homepage booking form with pre-filled service parameter
- Main Grid Content:
  - Custom paragraphs & bulleted lists parsed dynamically from database `content`
  - Sidebar: "Need a Professional Quote?" Contact card (with direct phone/email triggers)
  - Sidebar: "Our Service Guarantee" list
- Footer

---

#### 4. Admin Portal (Private)

##### Login Page `/admin/login`
- Company logo
- Email input
- Password input
- Login button
- Garden-themed background
- Error messages
- No public access

##### Dashboard `/admin`
**Protected Route** (Requires authentication)

**Navigation Sidebar**
- Dashboard
- Bookings
- Before & After
- Services
- Budgets
- Logout button

**Dashboard Overview**
- 4 Statistics Cards:
  - Total Bookings
  - Pending Jobs
  - Completed Jobs
  - Contacted Customers
- Quick Stats (completion rate, response rate)
- Recent Activity Feed

**Bookings Management**
- Status filter buttons (All, Pending, Contacted, Completed)
- Data table with columns:
  - Customer Name
  - Phone
  - Service
  - Budget
  - Status (with dropdown)
  - Actions (view, edit, delete)
- Booking details modal for editing

**Before & After Management**
- Add Project button
- Project creation form:
  - Title input
  - Description textarea
  - Media type selector (Images/Videos/Both)
  - File upload inputs (direct device upload)
  - Image preview
  - Video preview
- Project grid with:
  - Hover preview
  - Delete button
  - Media type badge (for videos)

**Services Management**
- Display of all offered services
- Service management info
- Add and Edit services:
  - Service Title input (unique)
  - Display Order input
  - Card Short Description textarea
  - Detailed Content textarea (lines starting with `-` or `*` are rendered as lists)
  - Banner image file upload (to Supabase Storage)
  - Lucide Icon selection dropdown
  - Active status checkbox
- Service deletion capability

**Budgets Management**
- Add budget option form:
  - Budget Value Range input (e.g. £500 - £1,000)
  - Display Order input
  - Active status checkbox
- List table of budgets:
  - Order column
  - Budget Range Value
  - Status indicator (Active/Inactive)
  - Edit & Delete capability (hard delete from database)

---

## Navigation Paths

### From Homepage
```
Homepage
├── Header: Click "Before & After" → /before-after
├── Hero: Click "Book a Service" → Smooth scroll to booking form
├── Services: Click on service card → /services/:id (opens detailed overview)
├── Booking: Submit form → Saves to database (validates budget range against active choices in database)
├── Contact: Click phone → Call action
└── Footer: Various links
```

### From Service Detail Page
```
Service Detail Page
├── Header: Click Logo/Home nav → /
├── Sidebar: Click Call/Email → Actions
└── Click "Request Booking" / "Book Now" → / with pre-filled service param (scrolls to booking form)
```

### From Before & After Gallery
```
Gallery Page
├── Header: Click logo → /
├── Header: Click home nav items → / (smooth scroll)
├── Back Button → /
└── Any navbar item → respective section on homepage
```

### From Admin Panel
```
Admin Portal (Private)
├── Login → /admin/login
├── Dashboard → /admin (after auth)
├── Sidebar: 
│   ├── Dashboard → Overview
│   ├── Bookings → Management table
│   ├── Before & After → Gallery upload
│   ├── Services → Service display and banner upload
│   ├── Budgets → Budget option configuration
│   └── Logout → /admin/login
└── Protected routes (auto-redirect if not authenticated)
```

---

## Complete URL Reference

| Page | URL | Purpose | Access |
|------|-----|---------|--------|
| Homepage | `/` | Main landing page | Public |
| Before & After Gallery | `/before-after` | Project portfolio | Public |
| Service Detail Page | `/services/:id` | Custom service description | Public |
| Admin Login | `/admin/login` | Authentication | Semi-public (intentionally unlisted) |
| Admin Dashboard | `/admin` | Management portal | Private (auth required) |
| Fallback | `*` | Any invalid URL | Redirects to `/` |

---

## SEO & Meta Structure

### Homepage
- Title: "Cambridge Green Leaves | Professional Gardening & Landscaping Services in Cambridge"
- Description: "Professional gardening, landscaping, fencing, turfing, tree surgery, hedge trimming, and garden clearance in Cambridge. Transforming gardens and creating beautiful outdoor spaces. Get a free quote today!"
- Keywords: landscaping, gardening, fencing, turfing, tree surgery, Cambridge, garden clearance

### Service Detail Page
- Title: "[Service Name] Services in Cambridge | Cambridge Green Leaves"
- Description: Custom description entered by administrator, or dynamic fallback text
- Keywords: service-specific keywords (e.g. landscaping, garden design)

### Gallery Page
- Title: "Before & After Gallery | Cambridge Green Leaves"
- Description: "See our latest garden transformation projects and before/after results"
- Keywords: before after, projects, gallery, landscaping, transformation

### Admin
- No SEO (private portal)
- Robots.txt excludes `/admin/*`

---

## Responsive Breakpoints

**Mobile** (< 640px)
- Single column layout
- Hamburger menu
- Full-width cards
- Touch-optimized sliders

**Tablet** (640px - 1024px)
- Two columns where applicable
- Optimized spacing
- Touch-friendly interactions

**Desktop** (> 1024px)
- Multi-column layouts
- Full desktop experience
- Hover effects active
- Drag/mouse-enabled interactions

---

## Key Design Elements

### Colors
- **Primary Green**: #16a34a (CTA buttons, highlights)
- **Secondary Yellow**: #eab308 (Call button, accents)
- **Neutral Grays**: For text and backgrounds
- **Success Green**: For completed status
- **Warning Yellow**: For pending status
- **Info Blue**: For contacted status

### Typography
- Headlines: Bold, large (24px-48px)
- Body: Regular, readable (14px-16px)
- Line height: 1.5-1.6 for body text

### Components
- Rounded cards (rounded-2xl, rounded-3xl)
- Soft shadows (shadow-lg, shadow-xl)
- Smooth transitions (300ms)
- Hover effects with transforms
- Modern form elements

---

## Performance Metrics

- Build size: ~30kb CSS (gzipped), ~376kb JS (gzipped)
- All pages load independently
- Images lazy-loaded by default
- Videos stream from cloud storage
- Database queries optimized with indexes
- Responsive images for different screen sizes
