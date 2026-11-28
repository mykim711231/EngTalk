import { useState } from 'react';
import { Link } from 'react-router-dom';
import { speak } from '../lib/tts';
import { useReviewStore } from '../stores/useReviewStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import Icon from '../components/Icon';

export default function ReviewPage() {
  const { items, remove, clear } = useReviewStore();
  const rate = useSettingsStore((s) => s.rate);
  const voiceUri = useSettingsStore((s) => s.voiceUri);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cur = items.length ? items[i % items.length] : null;

  const next = () => { setFlipped(false); setI((n) => (items.length ? (n + 1) % items.length : 0)); };
  const correct = () => { if (!cur) return; remove(cur.en); setFlipped(false); setI(0); };

  return (
    <main className="p-4 pb-28 space-y-4">
      <Link to="/" className="text-sm text-slate-500">← 홈</Link>
      <div className="flex items-end justify-between">
        <div><h1 className="text-xl font-bold">복습</h1><p className="text-xs text-slate-500">심화 학습에서 틀린 문장 {items.length}개</p></div>
        {items.length > 0 && <button type="button" onClick={clear} className="text-xs text-slate-500 underline">모두 지우기</button>}
      </div>

      {!cur && (
        <section className="card space-y-2 text-sm text-slate-600">
          <p>복습할 문장이 없어요.</p>
          <Link to="/path" className="inline-block text-brand underline">학습 경로로</Link>
        </section>
      )}

      {cur && (
        <section className="space-y-3">
          <div className="text-xs text-slate-500">{flipped ? '영어 확인' : '한글만 보고 영어로 말해 보세요'}</div>
          <div className="card grid min-h-44 place-items-center text-center">
            {!flipped ? <p className="text-xl font-semibold">{cur.ko}</p> : (
              <div><p className="text-sm text-slate-500">{cur.ko}</p><p lang="en" className="mt-2 font-en text-xl">{cur.en}</p>
                <button type="button" onClick={() => speak(cur.en, rate, voiceUri)} className="mt-2 text-brand"><Icon name="speaker" size={18} /></button></div>
            )}
          </div>
          {!flipped ? <button type="button" onClick={() => setFlipped(true)} className="w-full rounded-full bg-brand py-2 font-semibold text-white">영어 확인</button>
            : <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={next} className="rounded-xl border-2 border-red-300 bg-red-50 py-3 font-bold text-red-700">못함</button>
              <button type="button" onClick={correct} className="rounded-xl border-2 border-brand bg-brand-50 py-3 font-bold text-brand">맞음</button>
            </div>}
          <p className="text-center text-xs text-slate-400">맞음은 목록에서 제거되고, 못함은 다시 나옵니다.</p>
        </section>
      )}
    </main>
  );
}
