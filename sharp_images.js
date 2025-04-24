const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './src/img';
const outputFolder = './src/img/resized';
// mobile, tablet, desktop
const sizes = [320, 768, 1024];
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
        // Ignora icones
        if (metadata.width <= 32 && metadata.height <= 32) {
          console.log(`Icon ignored ${file} ${metadata.width}x${metadata.height}`);
          return;
        }
  
        sizes.forEach(size => {
          sharp(inputPath)
            .resize({ width: size })
            .webp({ quality })
            .toFile(path.join(outputFolder, `${name}-${size}.webp`))
            .then(() => console.log(`${name}-${size}.webp generated`))
            .catch(err => console.error(`Error ${file}:`, err));
        });
      })
      .catch(err => console.error(`Error: ${file}:`, err));
  });
