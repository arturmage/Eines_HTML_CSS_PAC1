const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './src/img';
const outputFolder = './src/img/resized';
// mobile, tablet, desktop
const densitySizes = [320, 768, 1024];
const multipliers = [1, 2, 3];
const baseWidth = 400;
const quality = 80;

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);
  
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  
    const inputPath = path.join(inputFolder, file);
  
    sharp(inputPath)
      .metadata()
      .then(metadata => {
        // Ignore icons
        if (metadata.width <= 32 && metadata.height <= 32) {
          console.log(`Icon ignored ${file} ${metadata.width}x${metadata.height}`);
          return;
        }
  
        // Density switching
        densitySizes.forEach(size => {
          sharp(inputPath)
            .resize({ width: size })
            .webp({ quality })
            .toFile(path.join(outputFolder, `${name}-${size}.webp`))
            .then(() => console.log(`${name}-${size}.webp generated`))
            .catch(err => console.error(`Error ${file}:`, err));
        });

        // Resolution switching      
        multipliers.forEach(mult => {
          const width = baseWidth * mult;
          sharp(inputPath)
            .resize({ width })
            .webp({ quality })
            .toFile(path.join(outputFolder, `${name}-${mult}x.webp`))
            .then(() => console.log(`${name}-${mult}x.webp generated (resolution)`))
            .catch(err => console.error(`Error ${file} (resolution):`, err));
        });
      })
      .catch(err => console.error(`Error: ${file}:`, err));
  });