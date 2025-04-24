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

  sizes.forEach(size => {
    sharp(path.join(inputFolder, file))
      .resize({ width: size })
      .webp({ quality })
      .toFile(path.join(outputFolder, `${name}-${size}.webp`))
      .then(() => console.log(`${name}-${size}.webp creat!`))
      .catch(err => console.error(`Error ${file}:`, err));
  });
});
