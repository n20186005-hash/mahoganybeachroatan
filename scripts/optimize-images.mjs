// 一次性脚本：统一图库命名（xxx-xxx-xxx-N.jpg）并压缩 JPEG，提升加载速度。
// 运行方式：node scripts/optimize-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'gallery');
const files = fs
  .readdirSync(dir)
  .filter((f) => /^mahogany-bay-cruise-terminal \(\d+\)\.jpg$/i.test(f))
  .sort(); // 与 Gallery 组件中的展示顺序一致

let seq = 0;
const totalBefore = files.reduce((s, f) => s + fs.statSync(path.join(dir, f)).size, 0);

for (const file of files) {
  seq += 1;
  const src = path.join(dir, file);
  const isHero = seq === 1;
  const maxWidth = isHero ? 1920 : 1280;
  const quality = isHero ? 80 : 76;
  const target = path.join(dir, `mahogany-bay-cruise-terminal-${seq}.jpg`);

  const meta = await sharp(src).metadata();
  const width = Math.min(maxWidth, meta.width || maxWidth);

  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(target);

  const kb = (fs.statSync(target).size / 1024).toFixed(0);
  console.log(`${file}  =>  ${path.basename(target)}  (${kb} KB, ${width}px)`);
}

const totalAfter = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.jpg'))
  .reduce((s, f) => s + fs.statSync(path.join(dir, f)).size, 0);

console.log('---');
console.log(`压缩前合计: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`压缩后合计: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
