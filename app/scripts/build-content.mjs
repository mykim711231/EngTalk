import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const SRC = join(ROOT, 'Doc', 'Markdown');
const OUT = join(HERE, '..', 'public', 'data');

const H2 = /^##\s+(.+?)\s*$/;
const TITLE = /^#\s+(\d+)\.\s+(.+?)\s+\(([^()]+)\)\s*$/;

const clean = (s) => s.replace(/\s*\/\s*/g, ' ').replace(/\s+/g, ' ').trim();
const chunks = (s) => s.split(/\s*\/\s*/).map((x) => x.trim()).filter(Boolean);
const value = (line, sep = ' · ') => {
  const i = line.indexOf(sep);
  return i >= 0 ? line.slice(i + sep.length).trim() : '';
};
const label = (line, sep = ' · ') => {
  const i = line.indexOf(sep);
  return i >= 0 ? line.slice(0, i).trim() : '';
};

function sections(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const title = lines[0].match(TITLE);
  if (!title) throw new Error(`title parse failed: ${lines[0]}`);
  const out = new Map();
  let current = null;
  for (const line of lines.slice(1)) {
    const h = line.match(H2);
    if (h) {
      current = h[1].trim();
      out.set(current, []);
    } else if (current) out.get(current).push(line);
  }
  return { no: Number(title[1]), titleKo: title[2].trim(), titleEn: title[3].trim(), out };
}

function requireSection(map, name) {
  const v = map.get(name);
  if (!v) throw new Error(`missing section: ${name}`);
  return v;
}

function pairs(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^-\s+(.+?)\s*$/);
    if (!m) continue;
    const ko = lines[i + 1]?.match(/^\s{2}-\s+(.+?)\s*$/);
    if (!ko) throw new Error(`missing translation after: ${lines[i]}`);
    out.push({ en: m[1].trim(), ko: ko[1].trim() });
    i++;
  }
  return out;
}

function dialogue(lines) {
  const turns = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^-\s+\*\*([AB])\*\*\s+(.+?)\s*$/);
    if (!m) continue;
    const ko = lines[i + 1]?.match(/^\s{2}-\s+(.+?)\s*$/);
    if (!ko) throw new Error(`missing dialogue translation after: ${lines[i]}`);
    turns.push({ speaker: m[1], en: m[2].trim(), ko: ko[1].trim(), chunks: chunks(m[2]) });
    i++;
  }
  return turns;
}

function goals(lines) {
  const out = {};
  for (const line of lines) {
    const m = line.match(/^-\s+(.+?)\s*$/);
    if (!m) continue;
    const k = label(m[1]);
    if (k) out[k] = value(m[1]);
  }
  return out;
}

function core(lines) {
  const result = { required: [], expanded: [] };
  let target = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) {
      target = h[1].includes('필수') ? result.required : h[1].includes('확장') ? result.expanded : null;
      continue;
    }
    if (!target) continue;
    const item = line.match(/^-\s+(.+?)\s*$/);
    if (!item) continue;
    const ko = lines[i + 1]?.match(/^\s{2}-\s+(.+?)\s*$/);
    if (!ko) throw new Error(`missing core translation after: ${line}`);
    target.push({ en: item[1].trim(), text: clean(item[1]), ko: ko[1].trim(), chunks: chunks(item[1]) });
    i++;
  }
  return result;
}

function vocab(lines) {
  const out = [];
  let current = null;
  for (const line of lines) {
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) {
      current = { term: h[1].trim(), ipa: '', meaning: '', example: '', translation: '' };
      out.push(current);
      continue;
    }
    if (!current) continue;
    const m = line.match(/^-\s+(.+?)\s*$/);
    if (!m) continue;
    const k = label(m[1]);
    const v = value(m[1]);
    if (k.startsWith('발음')) current.ipa = v.replace(/^\/|\/$/g, '');
    else if (k === '뜻') current.meaning = v;
    else if (k === '예문') current.example = v;
    else if (k === '번역') current.translation = v;
  }
  return out;
}

function structure(lines) {
  const out = {};
  for (const line of lines) {
    const m = line.match(/^-\s+(.+?)\s*$/);
    if (!m) continue;
    const k = label(m[1]);
    if (k) out[k] = value(m[1]);
  }
  return out;
}

function review(lines) {
  const split = lines.findIndex((l) => /^###\s+정답/.test(l.trim()));
  const body = split >= 0 ? lines.slice(0, split) : lines;
  const questions = [];
  for (const line of body) {
    const q = line.match(/^(\d+)\.\s+(.+?)\s*$/);
    if (q) questions.push({ no: Number(q[1]), prompt: q[2].trim(), choices: [] });
    const c = line.match(/^\s+-\s+([A-D])\.\s+(.+?)\s*$/);
    if (c && questions.length) questions[questions.length - 1].choices.push({ key: c[1], text: c[2].trim() });
  }
  let answers = [];
  if (split >= 0) {
    answers = lines.slice(split + 1)
      .map((l) => l.match(/^-\s+(.+?)\s*$/)?.[1].trim())
      .filter(Boolean);
  } else {
    const inline = body.find((l) => /^정답과\s+예시\s+답변은\s+/.test(l.trim()));
    if (inline) {
      const raw = inline.trim().replace(/^정답과\s+예시\s+답변은\s+/, '').replace(/\s*입니다\.\s*$/, '');
      answers = raw.split(/,\s*(?=\d+-)/).map((x) => x.trim()).filter(Boolean);
    }
  }
  return { questions, answers };
}

function roleplays(lines) {
  const out = [];
  let current = null;
  for (const line of lines) {
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) {
      current = { title: h[1].trim(), partner: '', hint: '', example: '', check: '' };
      out.push(current);
      continue;
    }
    if (!current) continue;
    const m = line.match(/^-\s+(.+?)\s*$/);
    if (!m) continue;
    const k = label(m[1]);
    const v = value(m[1]);
    if (k === '상대 음성') current.partner = v;
    else if (k === '힌트') current.hint = v;
    else if (k === '예시 답변') current.example = v;
    else if (k === '확인') current.check = v;
  }
  return out;
}

const REQUIRED = ['학습 목표', '기본 대화', '핵심 문장', '문장 구조와 바꿔 말하기', '주요 단어와 표현', '발음 포인트', '응용 대화', '복습', '듣고 답하기'];

function parseLesson(vol, file) {
  const parsed = sections(readFileSync(file, 'utf8'));
  for (const name of REQUIRED) requireSection(parsed.out, name);
  const g = goals(requireSection(parsed.out, '학습 목표'));
  const id = g['과 ID'];
  if (!id) throw new Error(`missing 과 ID: ${file}`);
  const expected = `vol${vol}-${String(parsed.no).padStart(2, '0')}`;
  if (id !== expected) throw new Error(`ID mismatch: ${id} != ${expected} (${file})`);
  const basic = dialogue(requireSection(parsed.out, '기본 대화'));
  const applied = dialogue(requireSection(parsed.out, '응용 대화'));
  const c = core(requireSection(parsed.out, '핵심 문장'));
  return {
    id,
    vol,
    no: parsed.no,
    level: Math.min(4, Math.ceil(vol / 3)),
    titleKo: parsed.titleKo,
    titleEn: parsed.titleEn,
    goals: g,
    dialogs: [
      { kind: 'basic', turns: basic },
      { kind: 'applied', turns: applied },
    ],
    core: c,
    structure: structure(requireSection(parsed.out, '문장 구조와 바꿔 말하기')),
    vocab: vocab(requireSection(parsed.out, '주요 단어와 표현')),
    pronunciation: requireSection(parsed.out, '발음 포인트').join(' ').trim(),
    review: review(requireSection(parsed.out, '복습')),
    roleplays: roleplays(requireSection(parsed.out, '듣고 답하기')),
  };
}

mkdirSync(OUT, { recursive: true });
const meta = [];
let total = 0;
for (let vol = 1; vol <= 12; vol++) {
  const dir = join(SRC, `vol${vol}`);
  const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  const lessons = files.map((f) => parseLesson(vol, join(dir, f)));
  writeFileSync(join(OUT, `lessons-vol${vol}.json`), JSON.stringify(lessons));
  for (const l of lessons) {
    meta.push({
      id: l.id,
      vol: l.vol,
      no: l.no,
      level: l.level,
      titleKo: l.titleKo,
      titleEn: l.titleEn,
    });
  }
  total += lessons.length;
  console.log(`vol${vol}: ${lessons.length} lessons`);
}
writeFileSync(join(OUT, 'lessons-meta.json'), JSON.stringify(meta));
console.log(`total: ${total} lessons, meta: ${meta.length}`);
