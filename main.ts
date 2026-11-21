// gta6-clipper-01 entry for make.fun: "Clip GTA 6 for the most YouTube views".
// The video itself is the entry: a 60-second vertical Short cut from Windah
// Basudara's GTA 6 livestream (the funniest laughing moment, picked from the
// stream's comments), with make.fun's pitch as on-screen text in its last
// 7 seconds. This program only hands the video's address to the gate: it
// copies VIDEO.json from the repository root to /output/VIDEO.json, and it
// refuses to write anything that is not a YouTube address, so a placeholder
// can never pass as an entry.
//
// Runs on Node 22, standard library only. Outside the grader's container,
// MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const videoPath = join(BOT_DIR, 'VIDEO.json');
const video = JSON.parse(readFileSync(videoPath, 'utf8')) as { url?: unknown };
if (typeof video.url !== 'string' || !/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(video.url)) {
  console.error(`VIDEO.json names no YouTube address: ${videoPath}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
console.log(`Entry video: ${video.url}`);
