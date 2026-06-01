import { execSync } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

const projectRoot = process.cwd();
const srcPath = path.join(projectRoot, 'public', 'logo_green_leaves.png');
const destPath = path.join(projectRoot, 'public', 'reducedSizeImages', 'logo_green_leaves_optimized.png');

if (os.platform() === 'win32') {
  try {
    console.log('[Optimize Logo] Running logo optimization on Windows...');
    
    // Check if source exists
    if (!fs.existsSync(srcPath)) {
      console.error('[Optimize Logo] Source logo not found at:', srcPath);
      process.exit(0);
    }

    // PowerShell script to resize image using .NET GDI+ (System.Drawing)
    const psScript = `
      [Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null
      $src = [System.Drawing.Image]::FromFile("${srcPath.replace(/\\/g, '\\\\')}")
      $bmp = New-Object System.Drawing.Bitmap(160, 120)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      
      # Use high quality resizing settings
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      
      $g.DrawImage($src, 0, 0, 160, 120)
      
      # Ensure destination folder exists
      $destFolder = Split-Path "${destPath.replace(/\\/g, '\\\\')}"
      if (!(Test-Path $destFolder)) {
        New-Item -ItemType Directory -Path $destFolder | Out-Null
      }
      
      $bmp.Save("${destPath.replace(/\\/g, '\\\\')}", [System.Drawing.Imaging.ImageFormat]::Png)
      $src.Dispose()
      $bmp.Dispose()
      $g.Dispose()
      write-output "Logo successfully resized and saved."
    `;

    // Execute the powershell script
    // Escape single quotes for PowerShell if needed, but since our paths do not contain single quotes it's fine.
    // Replace newlines with spaces to execute it as a single line command
    const formattedCommand = `powershell -NoProfile -Command "${psScript.replace(/\n/g, ' ')}"`;
    const result = execSync(formattedCommand, { encoding: 'utf-8' });
    console.log('[Optimize Logo] Success:', result.trim());
  } catch (err) {
    console.error('[Optimize Logo] Error running PowerShell resize:', err.message);
  }
} else {
  console.log('[Optimize Logo] Non-Windows platform detected. Skipping local build-time GDI+ resizing.');
}
