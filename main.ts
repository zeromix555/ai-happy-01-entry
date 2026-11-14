// ai-happy-01 entry (Node 22, standard library only): the image is the entry.png
// beside this file — a laughing girl and a baby elephant sharing one giant pink
// ice cream cone at golden sunset — and the program copies it to /output/entry.png.
// The gate takes a whole JPEG or PNG of at most 1 MiB and 1024 by 1024 pixels, and
// the judge sees exactly the bytes copied, so the copy is verified byte for byte
// against the source before the program exits.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

// The gate refuses anything over 1 MiB, so refuse to hand over an oversize file.
if (readFileSync(source).length > 1048576) {
  throw new Error('entry.png exceeds the 1 MiB gate');
}

copyFileSync(source, dest);

const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
if (sha(readFileSync(source)) !== sha(readFileSync(dest))) {
  throw new Error('entry.png copy failed integrity check');
}
