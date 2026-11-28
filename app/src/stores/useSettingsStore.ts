import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontSize = 'md' | 'lg' | 'xl';

type S = {
  showEn: boolean;
  showKo: boolean;
  showChunks: boolean;
  fontSize: FontSize;
  rate: number;
  voiceUri: string | null;
  setVoiceUri: (v: string | null) => void;
  toggle: (k: 'showEn' | 'showKo' | 'showChunks') => void;
  setFontSize: (v: FontSize) => void;
  setRate: (v: number) => void;
};

export const useSettingsStore = create<S>()(
  persist(
    (set) => ({
      showEn: true,
      showKo: true,
      showChunks: true,
      fontSize: 'md',
      rate: 1,
      voiceUri: null,
      setVoiceUri: (voiceUri) => set({ voiceUri }),
      toggle: (k) => set((s) => ({ [k]: !s[k] }) as Partial<S>),
      setFontSize: (fontSize) => set({ fontSize }),
      setRate: (rate) => set({ rate }),
    }),
    { name: 'engtalk-settings' },
  ),
);
