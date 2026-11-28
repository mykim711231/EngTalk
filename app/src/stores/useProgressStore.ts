import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

type P = {
  done: Record<string, true>;
  last?: string;
  days: Record<string, true>;
  markDone: (id: string) => void;
  setLast: (id: string) => void;
};

export const useProgressStore = create<P>()(
  persist(
    (set) => ({
      done: {},
      days: {},
      markDone: (id) => set((s) => ({ done: { ...s.done, [id]: true }, days: { ...s.days, [today()]: true }, last: id })),
      setLast: (last) => set({ last }),
    }),
    { name: 'engtalk-progress' },
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
