import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, '..', 'public', 'data');
const TTS_DIR = join(HERE, '..', 'public', 'tts');
const MANIFEST = join(DATA, 'en-tts-manifest.json');
const VOICE = 'en-US-AriaNeural';

const arg = process.argv.indexOf('--vol');
const vol = arg >= 0 ? Number(process.argv[arg + 1]) : 1;
const limitArg = process.argv.indexOf('--limit');
const limit = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : Infinity;

const normalize = (s) => s.replace(/\s+/g, ' ').trim();
const clean = (s) => normalize(s.replace(/\s*\/\s*/g, ' '));
const hashOf = (s) => createHash('sha1').update(normalize(s)).digest('hex').slice(0, 12);

const lessons = JSON.parse(readFileSync(join(DATA, `lessons-vol${vol}.json`), 'utf8'));
const texts = new Set();
for (const l of lessons) {
  for (const d of l.dialogs) for (const t of d.turns) texts.add(t.en);
  for (const c of [...l.core.required, ...l.core.expanded]) texts.add(c.text);
  for (const v of l.vocab) { texts.add(v.term); texts.add(v.example); }
}

mkdirSync(TTS_DIR, { recursive: true });
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const todo = [...texts].map(normalize).filter((t) => t && !existsSync(join(TTS_DIR, `${hashOf(t)}.mp3`)));
console.log(`vol${vol}: texts=${texts.size} todo=${todo.length}`);

async function client() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  return tts;
}

async function synth(tts, text) {
  const { audioStream } = tts.toStream(clean(text));
  const chunks = [];
  return new Promise((resolve, reject) => {
    audioStream.on('data', (d) => chunks.push(d));
    audioStream.on('error', reject);
    audioStream.on('close', () => (chunks.length ? resolve(Buffer.concat(chunks)) : reject(new Error('empty audio'))));
  });
}

let tts = await client();
let ok = 0, fail = 0;
for (const text of todo.slice(0, limit)) {
  let done = false;
  for (let attempt = 1; attempt <= 3 && !done; attempt++) {
    try {
      const file = `${hashOf(text)}.mp3`;
      writeFileSync(join(TTS_DIR, file), await synth(tts, text));
      manifest[text] = file;
      ok++; done = true;
    } catch (e) {
      console.warn(`retry ${attempt}: ${text} (${e.message})`);
      try { tts.close(); } catch { /* ignore */ }
      tts = await client();
    }
  }
  if (!done) fail++;
  if ((ok + fail) % 50 === 0) {
    writeFileSync(MANIFEST, JSON.stringify(manifest));
    console.log(`${ok + fail}/${todo.length}`);
  }
}
writeFileSync(MANIFEST, JSON.stringify(manifest));
try { tts.close(); } catch { /* ignore */ }

let bytes = 0;
for (const text of texts) {
  const p = join(TTS_DIR, `${hashOf(text)}.mp3`);
  if (existsSync(p)) bytes += statSync(p).size;
}
console.log(`synthesized=${ok} failed=${fail} size=${(bytes / 1024 / 1024).toFixed(2)}MB`);
if (fail) process.exit(1);
