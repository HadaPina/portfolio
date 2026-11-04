/**
 * 制作実績ページのスクリーンショットを、ヘッドレス Chrome で一括撮影する
 * 撮影対象は src/js/data/works.js の pages（url / image）から自動で取得するため、
 * 実績を追加したら `npm run capture && npm run images` を実行するだけで画像が揃う。
 *
 * 手動で撮った画像を守るため、既にあるファイルは撮影しない（撮り直すときは削除してから実行）
 *
 * 環境変数 CHROME_PATH で Chrome の実行ファイルを指定可能
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { works } from '../src/js/data/works.js';

const run = promisify(execFile);
const OUT_DIR = path.resolve('assets-src/screenshots');
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

await mkdir(OUT_DIR, { recursive: true });
const profile = await mkdtemp(path.join(tmpdir(), 'capture-'));

const capture = async (url, file, { sp = false } = {}) => {
  if (existsSync(path.join(OUT_DIR, file))) return;
  await run(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--user-data-dir=${profile}`,
    '--virtual-time-budget=8000',
    ...(sp
      ? [`--user-agent=${SP_UA}`, '--window-size=390,844', '--force-device-scale-factor=2']
      : ['--window-size=1280,900']),
    `--screenshot=${path.join(OUT_DIR, file)}`,
    url,
  ]);
};

const pages = works.flatMap((work) => work.pages ?? []);

for (const page of pages) {
  if (!page.url || !page.image) continue;
  await capture(page.url, `${page.image}.png`);
  if (page.sp) await capture(page.url, `${page.image}-sp.png`, { sp: true });
  console.log(`✓ ${page.image}`);
}
