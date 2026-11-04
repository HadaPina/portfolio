/**
 * 元画像を Web 表示用の WebP に変換する
 *
 * 1) 実績のスクリーンショット
 *   入力: assets-src/screenshots/*.png → 出力: public/images/works/*.webp
 *   - PC版（xxx.png）    : 幅1280px・ファーストビュー（1280×800）で切り出し
 *   - SP版（xxx-sp.png） : 幅780px以内（Retina用の @2x）・縦横比 1:2 で切り出し。小さい画像は拡大しない
 *
 * 2) バナー
 *   入力: assets-src/banners/*.{png,jpg,jpeg} → 出力: public/images/banners/*.webp
 *   - 縦横比はそのまま、幅1200px以内に縮小（小さい画像は拡大しない）
 *
 * 3) プロフィール写真
 *   入力: assets-src/profile.jpg（切り抜き・明るさ補正・背景ぼかし済み）→ 出力: public/images/profile.webp
 *   - 360px（表示サイズ120pxの3倍）に縮小
 */
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const listFiles = async (dir, exts) => {
  try {
    return (await readdir(dir)).filter((f) => exts.includes(path.extname(f).toLowerCase()));
  } catch {
    return []; // フォルダが無い場合はスキップ
  }
};

// ---- 1) Screenshots ----
const SHOT_SRC = 'assets-src/screenshots';
const SHOT_OUT = 'public/images/works';
await mkdir(SHOT_OUT, { recursive: true });

for (const file of await listFiles(SHOT_SRC, ['.png'])) {
  const name = path.basename(file, '.png');
  const isSp = name.endsWith('-sp');
  const input = sharp(path.join(SHOT_SRC, file));
  const spWidth = Math.min(780, (await input.metadata()).width);
  const size = isSp ? { width: spWidth, height: spWidth * 2 } : { width: 1280, height: 800 };

  await input
    .resize({ ...size, fit: 'cover', position: 'top' })
    .webp({ quality: 78 })
    .toFile(path.join(SHOT_OUT, `${name}.webp`));

  console.log(`✓ works/${name}.webp`);
}

// ---- 2) Banners ----
const BANNER_SRC = 'assets-src/banners';
const BANNER_OUT = 'public/images/banners';
await mkdir(BANNER_OUT, { recursive: true });

for (const file of await listFiles(BANNER_SRC, ['.png', '.jpg', '.jpeg'])) {
  const name = path.basename(file, path.extname(file));

  await sharp(path.join(BANNER_SRC, file))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(BANNER_OUT, `${name}.webp`));

  console.log(`✓ banners/${name}.webp`);
}

// ---- 3) Profile ----
await sharp('assets-src/profile.jpg')
  .resize(360)
  .webp({ quality: 82 })
  .toFile('public/images/profile.webp');

console.log('✓ profile.webp');
