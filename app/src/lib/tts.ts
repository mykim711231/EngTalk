let finish: (() => void) | null = null;
let token = 0;

export const ttsSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function stopSpeak() {
  token++;
  finish?.();
  finish = null;
  if (ttsSupported()) window.speechSynthesis.cancel();
}

export function englishVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'));
}

export function speakAsync(text: string, rate = 1, voiceUri?: string | null): Promise<void> {
  if (!ttsSupported()) return Promise.resolve();
  const my = ++token;
  window.speechSynthesis.cancel();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    const voices = englishVoices();
    const selected = voiceUri ? voices.find((v) => v.voiceURI === voiceUri) : undefined;
    u.voice = selected ?? voices.find((v) => /en-US/i.test(v.lang) && v.localService) ?? voices.find((v) => /en-US/i.test(v.lang)) ?? voices[0];
    const done = () => {
      if (my !== token) return;
          finish = null;
      resolve();
    };
    finish = done;
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
  });
}

export function speak(text: string, rate = 1, voiceUri?: string | null) {
  void speakAsync(text, rate, voiceUri);
}
