import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

type P = {
  done: Record<string, true>;
  dailyDone: Record<string, string>;
  mastered: Record<string, { score: number; at: string }>;
  last?: string;
  days: Record<string, true>;
  markDone: (id: string) => void;
  markDaily: (id: string) => void;
  markMastered: (id: string, score: number) => void;
  setLast: (id: string) => void;
};

export const useProgressStore = create<P>()(
  persist(
    (set) => ({
      done: {},
      dailyDone: {},
      mastered: {},
      days: {},
      markDone: (id) => set((s) => ({ done: { ...s.done, [id]: true }, days: { ...s.days, [today()]: true }, last: id })),
      markDaily: (id) => set((s) => ({ dailyDone: { ...s.dailyDone, [id]: today() }, days: { ...s.days, [today()]: true }, last: id })),
      markMastered: (id, score) => set((s) => ({ mastered: { ...s.mastered, [id]: { score, at: today() } }, done: { ...s.done, [id]: true }, days: { ...s.days, [today()]: true }, last: id })),
      setLast: (last) => set({ last }),
    }),
    { name: 'engspeak-progress' },
  ),
);

export function streak(days: Record<string, true>): number {
  const d = new Date();
  if (!days[today()]) d.setDate(d.getDate() - 1);
  let n = 0;
  for (;;) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!days[key]) break;
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
