import type { Lesson, LessonMeta } from '../types/lesson';

const B = import.meta.env.BASE_URL;
const cache = new Map<number, Lesson[]>();
let metaP: Promise<LessonMeta[]> | null = null;

export function loadMeta(): Promise<LessonMeta[]> {
  metaP ??= fetch(`${B}data/lessons-meta.json`)
    .then((r) => (r.ok ? (r.json() as Promise<LessonMeta[]>) : []))
    .catch(() => []);
  return metaP;
}

export function loadVolume(vol: number): Promise<Lesson[]> {
  const cached = cache.get(vol);
  if (cached) return Promise.resolve(cached);
  return fetch(`${B}data/lessons-vol${vol}.json`)
    .then((r) => (r.ok ? (r.json() as Promise<Lesson[]>) : []))
    .then((rows) => {
      cache.set(vol, rows);
      return rows;
    })
    .catch(() => []);
}

export async function loadLesson(id: string): Promise<Lesson | null> {
  const m = id.match(/^vol(\d+)-(\d+)$/);
  if (!m) return null;
  const rows = await loadVolume(Number(m[1]));
  return rows.find((l) => l.id === id) ?? null;
}
