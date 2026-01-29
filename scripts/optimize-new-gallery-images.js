const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets/images');
const outputDir = path.join(__dirname, '../public/assets/images-optimized');
const quality = 85;
const maxWidth = 2500;

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
    try {
        const files = fs.readdirSync(inputDir);
        // Filter for the new images only
        const targetFiles = files.filter(file =>
            (file.startsWith('banni-') || file.startsWith('mautkakuan-')) &&
            file.endsWith('.webp')
        );

        console.log(`Found ${targetFiles.length} images to optimize.`);

        for (const file of targetFiles) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);

            const stats = fs.statSync(inputPath);
            const originalSize = stats.size / 1024 / 1024; // MB

            console.log(`Optimizing ${file} (${originalSize.toFixed(2)} MB)...`);

            try {
                await sharp(inputPath)
                    .resize({ width: maxWidth, withoutEnlargement: true })
                    .webp({ quality: quality })
                    .toFile(outputPath);

                const newStats = fs.statSync(outputPath);
                const newSize = newStats.size / 1024 / 1024; // MB

                console.log(`  -> Done. New size: ${newSize.toFixed(2)} MB (Saved ${(originalSize - newSize).toFixed(2)} MB)`);
            } catch (err) {
                console.error(`  -> Failed to optimize ${file}:`, err);
            }
        }

        console.log('All images optimized.');

    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
