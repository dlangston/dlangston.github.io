export function createWatermarkedImage(imageUrl, watermarkText) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Draw watermark text - fixed size for consistency
      const fontSize = 32;
      ctx.font = `${fontSize}px sans-serif`;
      const watermarkColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--watermark-rgba')
        .trim();
      ctx.fillStyle = watermarkColor || 'rgba(40, 40, 40, 0.75)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      
      const padding = fontSize * 0.5;
      ctx.fillText(watermarkText, img.width - padding, img.height - padding);
      
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };
    
    img.src = imageUrl;
  });
}
