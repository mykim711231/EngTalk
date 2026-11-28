import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, '..', 'public', 'data');
const errors = [];
const lessons = [];

for (let vol = 1; vol <= 12; vol++) {
  const file = join(DATA, `lessons-vol${vol}.json`);
  const rows = JSON.parse(readFileSync(file, 'utf8'));
  if (rows.length !== 20) errors.push(`vol${vol}: ${rows.length} lessons`);
  for (const l of rows) lessons.push(l);
}

const meta = JSON.parse(readFileSync(join(DATA, 'lessons-meta.json'), 'utf8'));
if (meta.length !== 240) errors.push(`meta: ${meta.length} entries`);

const requiredGoals = ['과 ID', '핵심 문법', '상황 검색어', '말하기 목표'];
for (const l of lessons) {
  const at = `${l.id}`;
  for (const k of requiredGoals) if (!l.goals?.[k]) errors.push(`${at}: goal ${k} missing`);
  if (!Array.isArray(l.dialogs) || l.dialogs.length !== 2) { errors.push(`${at}: dialogs != 2`); continue; }
  for (const d of l.dialogs) {
    if (d.turns.length < 6 || d.turns.length > 8) errors.push(`${at}: ${d.kind} turns ${d.turns.length}`);
    d.turns.forEach((t, i) => {
      const first = d.turns[0].speaker;
      const expected = i % 2 === 0 ? first : (first === 'A' ? 'B' : 'A');
      if (t.speaker !== expected) errors.push(`${at}: ${d.kind} speaker ${i + 1}`);
      if (!t.en || !t.ko) errors.push(`${at}: ${d.kind} turn ${i + 1} empty`);
      if (!Array.isArray(t.chunks) || !t.chunks.length) errors.push(`${at}: ${d.kind} turn ${i + 1} chunks`);
    });
  }
  if (l.core?.required?.length !== 4) errors.push(`${at}: required core ${l.core?.required?.length}`);
  const expanded = l.core?.expanded?.length ?? 0;
  if (expanded < 6 || expanded > 8) errors.push(`${at}: expanded core ${expanded}`);
  for (const c of [...(l.core?.required ?? []), ...(l.core?.expanded ?? [])]) {
    if (!c.en || !c.text || !c.ko) errors.push(`${at}: core empty`);
  }
  if (!Array.isArray(l.vocab) || l.vocab.length < 10 || l.vocab.length > 15) errors.push(`${at}: vocab ${l.vocab?.length}`);
  for (const v of l.vocab ?? []) {
    if (!v.term || !v.ipa || !v.meaning || !v.example || !v.translation) errors.push(`${at}: vocab incomplete ${v.term}`);
  }
  for (const key of ['대화 문장', '문장 구조', '뜻과 어순', '바꿔 말하기']) {
    if (!l.structure?.[key]) errors.push(`${at}: structure ${key} missing`);
  }
  if (!l.pronunciation) errors.push(`${at}: pronunciation missing`);
  if (l.review?.questions?.length !== 4) errors.push(`${at}: review questions ${l.review?.questions?.length}`);
  if (l.review?.questions?.[0]?.choices?.length !== 4) errors.push(`${at}: first review choices`);
  if (l.review?.answers?.length !== 4) errors.push(`${at}: review answers ${l.review?.answers?.length}`);
  if (!Array.isArray(l.roleplays) || l.roleplays.length < 2 || l.roleplays.length > 3) errors.push(`${at}: roleplays ${l.roleplays?.length}`);
  for (const r of l.roleplays ?? []) {
    if (!r.title || !r.partner || !r.hint || !r.example || !r.check) errors.push(`${at}: roleplay incomplete`);
  }
}

const summary = lessons.reduce((a, l) => {
  a.vol[l.vol] = (a.vol[l.vol] ?? 0) + 1;
  return a;
}, { vol: {} });

console.log(JSON.stringify({
  lessons: lessons.length,
  vols: summary.vol,
  errors: errors.length,
  samples: errors.slice(0, 30),
}, null, 2));
if (errors.length) process.exit(1);
