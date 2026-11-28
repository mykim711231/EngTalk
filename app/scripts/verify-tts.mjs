import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, '..', 'public', 'data');
const TTS_DIR = join(HERE, '..', 'public', 'tts');
const MANIFEST = join(DATA, 'en-tts-manifest.json');

const arg = process.argv.indexOf('--vol');
const vol = arg >= 0 ? Number(process.argv[arg + 1]) : 1;
const normalize = (s) => s.replace(/\s+/g, ' ').trim();
const clean = (s) => normalize(s.replace(/\s*\/\s*/g, ' '));
const hashOf = (s) => createHash('sha1').update(normalize(s)).digest('hex').slice(0, 12);

const lessons = JSON.parse(readFileSync(join(DATA, `lessons-vol${vol}.json`), 'utf8'));
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const texts = new Set();
for (const l of lessons) {
  for (const d of l.dialogs) for (const t of d.turns) texts.add(t.en);
  for (const c of [...l.core.required, ...l.core.expanded]) texts.add(c.text);
  for (const v of l.vocab) { texts.add(v.term); texts.add(v.example); }
}
const missing = [];
for (const raw of texts) {
  const text = normalize(raw);
  if (!text) continue;
  const file = manifest[text] ?? `${hashOf(text)}.mp3`;
  if (!existsSync(join(TTS_DIR, file))) missing.push(text);
}
console.log(JSON.stringify({ vol, texts: texts.size, missing: missing.length, samples: missing.slice(0, 20) }, null, 2));
if (missing.length) process.exit(1);
