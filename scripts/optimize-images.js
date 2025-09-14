const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets/images');
const outputDir = path.join(__dirname, '../public/assets/images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const sizes = [
  { suffix: '-sm', width: 640, quality: 80 },
  { suffix: '-md', width: 1200, quality: 85 },
  { suffix: '-lg', width: 1920, quality: 90 }
];

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizing ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
    
    // Generate different sizes
    for (const size of sizes) {
      const outputPathWithSize = outputPath.replace('.webp', `${size.suffix}.webp`);
      
      await image
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: size.quality,
          effort: 6,
          smartSubsample: true
        })
        .toFile(outputPathWithSize);
      
      const stats = fs.statSync(outputPathWithSize);
      console.log(`  Created ${path.basename(outputPathWithSize)} (${Math.round(stats.size / 1024)}KB)`);
    }
    
    // Also create an AVIF version for modern browsers
    const avifPath = outputPath.replace('.webp', '.avif');
    await image
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .avif({ 
        quality: 80,
        effort: 6
      })
      .toFile(avifPath);
    
    const avifStats = fs.statSync(avifPath);
    console.log(`  Created ${path.basename(avifPath)} (${Math.round(avifStats.size / 1024)}KB)`);
    
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  try {
    const files = fs.readdirSync(inputDir);
    const webpFiles = files.filter(file => file.endsWith('.webp'));
    
    console.log(`Found ${webpFiles.length} images to optimize`);
    
    for (const file of webpFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);
      await optimizeImage(inputPath, outputPath);
    }
    
    console.log('\nImage optimization complete!');
    console.log(`Optimized images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

optimizeAllImages();
