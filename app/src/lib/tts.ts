import { useSettingsStore } from '../stores/useSettingsStore';

const B = import.meta.env.BASE_URL;
const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();

let manifestP: Promise<Record<string, string>> | null = null;
const loadManifest = (): Promise<Record<string, string>> =>
  (manifestP ??= fetch(`${B}data/en-tts-manifest.json`)
    .then((r) => (r.ok ? (r.json() as Promise<Record<string, string>>) : {}))
    .catch(() => ({})));

export async function enMp3Url(text: string): Promise<string | null> {
  const f = (await loadManifest())[normalize(text)];
  return f ? `${B}tts/${f}` : null;
}

export const ttsSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
let token = 0;
let audio: HTMLAudioElement | null = null;
let settle: (() => void) | null = null;

export function stopSpeak() {
  token++;
  if (audio) { audio.pause(); audio = null; }
  if (ttsSupported()) window.speechSynthesis.cancel();
  const s = settle; settle = null; s?.();
}

export function englishVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'));
}

function fallback(text: string, rate: number, voiceUri: string | null, done: () => void) {
  if (!ttsSupported()) return done();
  const voices = englishVoices();
  const selected = voices.find((v) => v.voiceURI === voiceUri);
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  u.voice = selected ?? voices.find((v) => /en-US/i.test(v.lang) && v.localService) ?? voices.find((v) => /en-US/i.test(v.lang)) ?? voices[0];
  u.onend = done;
  u.onerror = done;
  window.speechSynthesis.speak(u);
}

export function speakAsync(text: string, rate = useSettingsStore.getState().rate, voiceUri: string | null = useSettingsStore.getState().voiceUri): Promise<void> {
  stopSpeak();
  const my = token;
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (settle === finish) settle = null;
      resolve();
    };
    settle = finish;
    const device = useSettingsStore.getState().voiceMode === 'device';
    if (device) return fallback(text, rate, voiceUri, finish);
    void enMp3Url(text).then((url) => {
      if (my !== token) return finish();
      if (!url) return fallback(text, rate, voiceUri, finish);
      const a = new Audio(url);
      a.playbackRate = rate;
      audio = a;
      a.onended = () => { if (audio === a) audio = null; finish(); };
      a.onerror = () => { if (audio === a) audio = null; fallback(text, rate, voiceUri, finish); };
      a.play().catch(() => {
        if (my !== token) return finish();
        if (audio === a) audio = null;
        fallback(text, rate, voiceUri, finish);
      });
    });
  });
}

export function speak(text: string, rate = useSettingsStore.getState().rate, voiceUri: string | null = useSettingsStore.getState().voiceUri) {
  void speakAsync(text, rate, voiceUri);
}
