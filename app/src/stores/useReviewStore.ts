import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ReviewItem = { lessonId: string; en: string; ko: string; at: number };

type S = {
  items: ReviewItem[];
  add: (item: Omit<ReviewItem, 'at'>) => void;
  remove: (en: string) => void;
  clear: () => void;
};

export const useReviewStore = create<S>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => set((s) => {
        if (s.items.some((x) => x.lessonId === item.lessonId && x.en === item.en)) return {};
        return { items: [...s.items, { ...item, at: Date.now() }] };
      }),
      remove: (en) => set((s) => ({ items: s.items.filter((x) => x.en !== en) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'engspeak-review' },
  ),
);
