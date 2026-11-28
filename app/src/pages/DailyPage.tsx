import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { loadLesson, loadMeta } from '../lib/contentLoader';
import { speakAsync, stopSpeak } from '../lib/tts';
import { useProgressStore } from '../stores/useProgressStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import type { Dialog, Lesson, LessonMeta } from '../types/lesson';
import Icon from '../components/Icon';

const STEPS = [
  { sec: 60, name: '워밍업', desc: '음원 전체 듣기 (자막 없음)', mask: true },
  { sec: 60, name: '스크립트', desc: '스크립트 보며 다시 듣기', mask: false },
  { sec: 120, name: '표현 확인', desc: '모르는 표현을 확인하세요', mask: false },
  { sec: 120, name: '리듬 따라가기', desc: '의미 단위로 끊어 따라 읽기', mask: false },
  { sec: 120, name: '쉐도잉', desc: '듣고 바로 따라 말해 보세요', mask: false, hideKo: true },
  { sec: 120, name: '마무리', desc: '자막 없이 최종 듣기', mask: true },
] as const;

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.max(0, Math.ceil(s)) % 60).padStart(2, '0')}`;

export default function DailyPage() {
  const [params, setParams] = useSearchParams();
  const [meta, setMeta] = useState<LessonMeta[]>([]);
  const [id, setId] = useState<string | null>(params.get('id'));
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [target, setTarget] = useState<'basic' | 'applied'>('basic');
  const [state, setState] = useState<'idle' | 'running' | 'paused' | 'done'>('idle');
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState<number>(STEPS[0].sec);
  const [idx, setIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const prog = useProgressStore();
  const rate = useSettingsStore((s) => s.rate);
  const voiceUri = useSettingsStore((s) => s.voiceUri);
  const stepRef = useRef(0);
  const cursor = useRef(0);
  stepRef.current = step;

  useEffect(() => { void loadMeta().then(setMeta); }, []);
  const rec = useMemo(() => meta.find((m) => !prog.done[m.id]) ?? meta[0], [meta, prog.done]);
  const curId = id ?? rec?.id ?? null;

  useEffect(() => {
    let active = true;
    setLesson(null);
    if (curId) void loadLesson(curId).then((l) => { if (active) setLesson(l ?? null); });
    return () => { active = false; };
  }, [curId]);

  const dialog: Dialog | undefined = lesson?.dialogs.find((d) => d.kind === target);
  const lines = dialog?.turns ?? [];

  useEffect(() => {
    if (state !== 'running') return;
    const t = window.setInterval(() => setLeft((v) => v - 0.25), 250);
    return () => window.clearInterval(t);
  }, [state]);

  useEffect(() => {
    if (state !== 'running' || left > 0) return;
    if (step >= STEPS.length - 1) { finish(); return; }
    const n = step + 1;
    setStep(n);
    setLeft(STEPS[n].sec);
    setToast(`다음 단계: ${STEPS[n].name}`);
    window.setTimeout(() => setToast(null), 2500);
  }, [left]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state !== 'running' || !lines.length) return;
    let alive = true;
    void (async () => {
      while (alive) {
        const i = cursor.current % lines.length;
        setIdx(i);
        const started = Date.now();
        await speakAsync(lines[i].en, rate, voiceUri);
        const spent = Date.now() - started;
        if (!alive) break;
        await new Promise((r) => setTimeout(r, stepRef.current === 4 ? Math.min(6000, Math.max(1200, spent + 500)) : 450));
        if (!alive) break;
        cursor.current = (i + 1) % lines.length;
      }
    })();
    return () => { alive = false; stopSpeak(); };
  }, [state, step, lines, rate, voiceUri]);

  useEffect(() => () => stopSpeak(), []);

  const finish = () => {
    stopSpeak();
    if (lesson) prog.markDaily(lesson.id);
    setState('done');
  };

  const start = () => {
    if (!lesson || !lines.length) return;
    setId(lesson.id);
    prog.setLast(lesson.id);
    cursor.current = 0;
    setIdx(0);
    setStep(0);
    setLeft(STEPS[0].sec);
    setState('running');
  };

  const reset = () => {
    stopSpeak();
    cursor.current = 0;
    setIdx(0);
    setStep(0);
    setLeft(STEPS[0].sec);
    setState('idle');
  };

  const changeTarget = (next: 'basic' | 'applied') => {
    if (next === target) return;
    reset();
    setTarget(next);
  };

  const remaining = STEPS.slice(step + 1).reduce((a, s) => a + s.sec, 0) + Math.max(0, left);
  const cur = STEPS[step];
  const line = lines[idx];
  const total = STEPS.reduce((a, s) => a + s.sec, 0);
  const isDone = lesson ? !!prog.dailyDone[lesson.id] : false;

  return (
    <main className="p-4 pb-28 space-y-4">
      {lesson && <Link to={`/lesson/${lesson.id}`} className="text-sm text-slate-500">← {lesson.no}. {lesson.titleKo} 과 참고</Link>}
      <div className="flex items-center justify-between">
        <h1 className="inline-flex items-center gap-2 text-xl font-bold"><Icon name="timer" size={22} className="text-brand" /> 10분 데일리</h1>
        {state === 'running' || state === 'paused' ? <span className="font-mono text-lg">{mmss(remaining)}</span> : null}
      </div>

      <div role="group" aria-label="학습 대상" className="flex flex-wrap gap-2">
        <span className="w-full text-sm font-semibold">학습 대상</span>
        {(['basic', 'applied'] as const).map((k) => (
          <button key={k} type="button" aria-pressed={target === k} onClick={() => changeTarget(k)}
            disabled={!lesson?.dialogs.some((d) => d.kind === k && d.turns.length)}
            className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold disabled:opacity-40 ${target === k ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
            {k === 'basic' ? '기본 대화' : '응용 대화'}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500">{target === 'basic' ? '기본 대화' : '응용 대화'} · {lines.length}문장 {isDone ? '· 오늘 완료' : ''}</p>

      {state === 'idle' && (
        <section className="space-y-3">
          <p className="text-sm text-slate-600">출퇴근·자투리 시간 10분, 대화 소리에 매일 노출되는 습관을 만들어요. 6단계가 타이머로 자동 전환됩니다.</p>
          <label className="block text-sm font-semibold">
            오늘의 과
            <select value={curId ?? ''} onChange={(e) => {
              setId(e.target.value);
              const q = new URLSearchParams(params); q.set('id', e.target.value); setParams(q, { replace: true });
              reset();
            }} className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-normal">
              {meta.map((m) => <option key={m.id} value={m.id}>Vol.{m.vol} · {m.no}과 · {m.titleKo}{m.id === rec?.id ? ' (추천)' : ''}</option>)}
            </select>
          </label>
          <ol className="space-y-1 rounded-xl border border-slate-200 bg-white p-3 text-sm">
            {STEPS.map((s, i) => <li key={s.name} className="flex gap-2"><span className="w-12 flex-none text-slate-500">{s.sec / 60}분</span><span><b>{i + 1}. {s.name}</b> — {s.desc}</span></li>)}
          </ol>
          <button type="button" disabled={!lines.length} onClick={start} className="w-full rounded-full bg-brand py-3 font-semibold text-white disabled:opacity-40">
            <span className="inline-flex items-center gap-2"><Icon name="play" size={18} /> 시작하기 ({total / 60}분)</span>
          </button>
        </section>
      )}

      {(state === 'running' || state === 'paused') && lesson && (
        <section className="space-y-3">
          <div className="flex gap-1" aria-label="단계">
            {STEPS.map((s, i) => <span key={s.name} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-brand' : i === step ? 'bg-brand/60' : 'bg-slate-200'}`} />)}
          </div>
          <div>
            <div className="text-xs text-slate-500">{step + 1}/6 · {mmss(left)}</div>
            <h2 className="text-lg font-bold">{cur.name}</h2>
            <p className="text-sm text-slate-600">{cur.desc}</p>
          </div>

          <div className="min-h-40 rounded-2xl border border-slate-200 bg-white p-4">
            {line && (
              <div className={cur.mask ? 'select-none blur-md' : ''} aria-hidden={cur.mask}>
                <p className="mb-2 text-xs text-slate-500">{line.speaker}</p>
                <p lang="en" className="font-en text-xl leading-snug">{cur.name === '리듬 따라가기' ? line.chunks.join(' / ') : line.chunks.join(' ')}</p>
                {!('hideKo' in cur && cur.hideKo) && <p className="mt-1 text-base text-slate-600">{line.ko}</p>}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {state === 'running'
              ? <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" onClick={() => { stopSpeak(); setState('paused'); }}><Icon name="pause" size={14} /> 일시정지</button>
              : <button type="button" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={() => setState('running')}><Icon name="play" size={14} /> 계속</button>}
            <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" onClick={() => setLeft(0)}>건너뛰기</button>
            <button type="button" className="ml-auto rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" onClick={finish}>끝내기</button>
          </div>
        </section>
      )}

      {state === 'done' && lesson && (
        <section role="status" className="space-y-3 rounded-2xl border border-green-300 bg-green-50 p-5 text-center">
          <Icon name="check" size={40} className="mx-auto text-brand" />
          <h2 className="text-xl font-bold">오늘의 10분 완료!</h2>
          <p className="text-sm"><b>{lesson.no}. {lesson.titleKo}</b> 대화를 6단계로 들었어요.</p>
          <div className="flex justify-center gap-2">
            <Link to={`/lesson/${lesson.id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">과 다시 보기</Link>
            <button type="button" onClick={reset} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">다시 시작</button>
          </div>
        </section>
      )}

      {toast && <div className="fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 pointer-events-none"><div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white shadow-lg">{toast}</div></div>}
    </main>
  );
}
