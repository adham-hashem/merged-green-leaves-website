/**
 * Compresses an image client-side before upload to reduce payload sizes and improve page load speeds.
 * Returns a new File object (or standard Blob) with optimized WebP compression and resized dimensions.
 */
export async function compressImage(file: File, maxDimension = 1000, quality = 0.8): Promise<File> {
  // If the file is not an image, return it as-is
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio and resize if needed
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // Fallback to original
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to WebP blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file); // Fallback
              return;
            }
            // Create a new file from blob
            const newName = file.name.substring(0, file.name.lastIndexOf('.')) + '.webp';
            const compressedFile = new File([blob], newName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
