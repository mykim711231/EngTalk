import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { englishVoices } from '../lib/tts';
import { useProgressStore } from '../stores/useProgressStore';
import { useReviewStore } from '../stores/useReviewStore';
import { useSettingsStore } from '../stores/useSettingsStore';

export default function SettingsPage() {
  const s = useSettingsStore();
  const prog = useProgressStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const load = () => setVoices(englishVoices());
    load();
    window.speechSynthesis?.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', load);
  }, []);

  const reset = () => {
    if (!window.confirm('학습 진도를 모두 지울까요?')) return;
    useProgressStore.setState({ done: {}, dailyDone: {}, mastered: {}, days: {}, last: undefined });
    useReviewStore.getState().clear();
  };

  return (
    <main className="p-4 pb-28 space-y-4">
      <h1 className="text-xl font-bold">설정</h1>

      <section className="card space-y-3">
        <h2 className="font-bold">화면</h2>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">글자 크기</span>
          <div className="flex gap-1">
            {([['md', '보통'], ['lg', '크게'], ['xl', '아주 크게']] as const).map(([v, label]) => (
              <button key={v} type="button" onClick={() => s.setFontSize(v)} className={`rounded-full border px-3 py-1 text-xs font-semibold ${s.fontSize === v ? 'border-brand bg-brand text-white' : 'border-slate-200 text-slate-600'}`}>{label}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={s.showEn} onClick={() => s.toggle('showEn')} className={`rounded-full border px-3 py-1 text-sm font-semibold ${s.showEn ? 'border-brand bg-brand text-white' : 'border-slate-200'}`}>영어 표시</button>
          <button type="button" aria-pressed={s.showKo} onClick={() => s.toggle('showKo')} className={`rounded-full border px-3 py-1 text-sm font-semibold ${s.showKo ? 'border-brand bg-brand text-white' : 'border-slate-200'}`}>한글 표시</button>
          <button type="button" aria-pressed={s.showChunks} onClick={() => s.toggle('showChunks')} className={`rounded-full border px-3 py-1 text-sm font-semibold ${s.showChunks ? 'border-brand bg-brand text-white' : 'border-slate-200'}`}>의미단위</button>
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="font-bold">음성</h2>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">속도</span>
          <div className="flex gap-1">
            {[0.8, 1, 1.2].map((r) => (
              <button key={r} type="button" onClick={() => s.setRate(r)} className={`rounded-full border px-3 py-1 text-xs font-semibold ${s.rate === r ? 'border-brand bg-brand text-white' : 'border-slate-200 text-slate-600'}`}>{r}×</button>
            ))}
          </div>
        </div>
        <label className="block text-sm">
          영어 음성
          <select value={s.voiceUri ?? ''} onChange={(e) => s.setVoiceUri(e.target.value || null)} className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-normal">
            <option value="">기본 음성</option>
            {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
          </select>
        </label>
        <p className="text-xs text-slate-500">음성은 기기에 설치된 영어 음성을 사용합니다. 목록이 비어 있으면 잠시 후 다시 열어 보세요.</p>
      </section>

      <section className="card space-y-2">
        <h2 className="font-bold">학습 기록</h2>
        <p className="text-sm text-slate-600">완료 {Object.keys(prog.done).length}과</p>
        <button type="button" onClick={reset} className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700">진도 초기화</button>
      </section>

      <div className="text-center text-xs text-slate-400">
        <p>EngTalk · 12권 240과</p>
        <Link to="/path" className="text-brand underline">학습 경로로</Link>
      </div>
    </main>
  );
}
