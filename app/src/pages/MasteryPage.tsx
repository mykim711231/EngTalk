import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { loadLesson, loadMeta } from '../lib/contentLoader';
import { speak } from '../lib/tts';
import { useProgressStore } from '../stores/useProgressStore';
import { useReviewStore } from '../stores/useReviewStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import type { Lesson, Turn } from '../types/lesson';
import Icon from '../components/Icon';

type Stage = 0 | 1 | 2;
const STAGES = ['듣고 이해', '보고 떠올리기', '따라 말하기'] as const;
const shuffle = <T,>(a: T[]) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
};

export default function MasteryPage() {
  const [params] = useSearchParams();
  const [id, setId] = useState(params.get('id') ?? '');
  const [meta, setMeta] = useState<Awaited<ReturnType<typeof loadMeta>>>([]);
  const [lesson, setLesson] = useState<Lesson | null | undefined>(undefined);
  const [target, setTarget] = useState<'basic' | 'applied'>('basic');
  const [stage, setStage] = useState<Stage>(0);
  const [quiz, setQuiz] = useState<{ correct: number; total: number } | null>(null);
  const [recall, setRecall] = useState<{ correct: number; total: number } | null>(null);
  const [finished, setFinished] = useState(false);
  const [shadowDone, setShadowDone] = useState(false);
  const prog = useProgressStore();
  const review = useReviewStore();

  useEffect(() => { void loadMeta().then(setMeta); }, []);
  useEffect(() => {
    let active = true;
    setLesson(undefined);
    const cur = id || '';
    if (cur) void loadLesson(cur).then((l) => { if (active) setLesson(l ?? null); });
    return () => { active = false; };
  }, [id]);
  useEffect(() => {
    if (!id && meta[0]) setId(meta[0].id);
  }, [id, meta]);

  const dialog = lesson?.dialogs.find((d) => d.kind === target);
  const turns = dialog?.turns ?? [];

  const reset = () => {
    setStage(0);
    setQuiz(null);
    setRecall(null);
    setFinished(false);
    setShadowDone(false);
  };

  const changeTarget = (next: 'basic' | 'applied') => {
    if (next === target) return;
    setTarget(next);
    reset();
  };

  const totalScore = quiz && recall
    ? Math.round(((quiz.correct / Math.max(1, quiz.total)) + (recall.correct / Math.max(1, recall.total))) * 50)
    : 0;
  const done = lesson ? prog.mastered[lesson.id] : undefined;

  const finish = () => {
    if (!lesson || !quiz || !recall) return;
    prog.markMastered(lesson.id, totalScore);
    setFinished(true);
  };

  if (lesson === undefined) return <main className="p-4">불러오는 중…</main>;
  if (lesson === null) return <main className="p-4">과를 찾을 수 없습니다. <Link to="/path" className="text-brand">목록으로</Link></main>;

  return (
    <main className="p-4 pb-28 space-y-4">
      <Link to={`/lesson/${lesson.id}`} className="text-sm text-slate-500">← {lesson.no}. {lesson.titleKo} 과 참고</Link>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold">심화 학습</h1>
          <p className="text-sm text-slate-500">{lesson.titleKo} · {lesson.titleEn}</p>
        </div>
        {done && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">{done.score}점</span>}
      </div>

      <div className="flex flex-wrap gap-2">
        <label className="text-sm font-semibold">
          과 선택
          <select value={lesson.id} onChange={(e) => { setId(e.target.value); reset(); }} className="mt-1 block rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal">
            {meta.map((m) => <option key={m.id} value={m.id}>Vol.{m.vol} · {m.no}과 · {m.titleKo}</option>)}
          </select>
        </label>
      </div>

      <div role="group" aria-label="학습 대상" className="flex gap-2">
        {(['basic', 'applied'] as const).map((k) => (
          <button key={k} type="button" aria-pressed={target === k} onClick={() => changeTarget(k)}
            disabled={!lesson.dialogs.some((d) => d.kind === k && d.turns.length)}
            className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold disabled:opacity-40 ${target === k ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
            {k === 'basic' ? '기본 대화' : '응용 대화'}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500">{target === 'basic' ? '기본 대화' : '응용 대화'} · {turns.length}문장</p>

      <ol className="grid grid-cols-3 gap-1" aria-label="진행 단계">
        {STAGES.map((s, i) => (
          <li key={s}><button type="button" onClick={() => setStage(i as Stage)} aria-current={stage === i ? 'step' : undefined}
            className={`w-full rounded-lg border py-2 text-xs font-semibold ${stage === i ? 'border-brand bg-brand text-white' : i < stage ? 'border-brand-200 bg-brand-50 text-brand' : 'border-slate-200 bg-white text-slate-500'}`}>{i + 1}. {s}</button></li>
        ))}
      </ol>

      {stage === 0 && <Quiz key={`${lesson.id}:${target}:quiz`} turns={turns} onDone={(r) => setQuiz(r)} />}
      {stage === 1 && <Recall key={`${lesson.id}:${target}:recall`} turns={turns} onWrong={(t) => review.add({ lessonId: lesson.id, en: t.en, ko: t.ko })} onDone={(r) => setRecall(r)} />}
      {stage === 2 && <Shadow turns={turns} done={shadowDone} onDone={() => setShadowDone(true)} />}

      <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
        <p>듣고 이해 {quiz ? `${quiz.correct}/${quiz.total}` : '-'} · 떠올리기 {recall ? `${recall.correct}/${recall.total}` : '-'}</p>
        {quiz && recall && shadowDone && !finished && <button type="button" onClick={finish} className="mt-2 w-full rounded-full bg-brand py-2 font-semibold text-white">심화 학습 완료 · {totalScore}점</button>}
        {finished && <div className="mt-2 space-y-2"><p className="font-semibold text-brand">완료! {totalScore}점</p><Link to="/review" className="block text-center text-brand underline">틀린 문장 복습하기</Link></div>}
      </div>

      <nav className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
        <Link to={`/lesson/${lesson.id}`} className="text-slate-500">과로 돌아가기</Link>
        <Link to="/path" className="text-slate-500 underline">목차</Link>
      </nav>
    </main>
  );
}

function Quiz({ turns, onDone }: { turns: Turn[]; onDone: (r: { correct: number; total: number }) => void }) {
  const rate = useSettingsStore((s) => s.rate);
  const voiceUri = useSettingsStore((s) => s.voiceUri);
  const questions = useMemo(() => {
    const pool = shuffle(turns).slice(0, Math.min(8, turns.length));
    return pool.map((t) => {
      const wrong = shuffle(turns.filter((x) => x.ko !== t.ko).map((x) => x.ko)).slice(0, 3);
      return { turn: t, options: shuffle([t.ko, ...wrong]) };
    });
  }, [turns]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const q = questions[i];

  useEffect(() => { if (q) speak(q.turn.en, rate, voiceUri); }, [q, rate, voiceUri]);
  if (!questions.length) return <p className="text-sm text-slate-500">문장이 없습니다.</p>;
  if (!q) return null;

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.turn.ko) setCorrect((n) => n + 1);
  };
  const next = () => {
    if (i + 1 >= questions.length) onDone({ correct, total: questions.length });
    else { setI(i + 1); setPicked(null); }
  };

  return (
    <section className="card space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500"><span>{i + 1}/{questions.length}</span><span>듣고 뜻 고르기</span></div>
      <button type="button" onClick={() => speak(q.turn.en, rate, voiceUri)} className="inline-flex items-center gap-1.5 rounded-full border border-brand px-3 py-1.5 text-sm font-semibold text-brand"><Icon name="speaker" size={14} /> 다시 듣기</button>
      <p className="text-sm text-slate-500">문장을 듣고 알맞은 뜻을 고르세요.</p>
      <ul className="space-y-2">
        {q.options.map((opt) => {
          const isPick = picked === opt;
          const isAnswer = opt === q.turn.ko;
          const cls = picked ? (isAnswer ? 'border-green-500 bg-green-50' : isPick ? 'border-red-400 bg-red-50' : 'border-slate-200') : 'border-slate-200';
          return <li key={opt}><button type="button" onClick={() => choose(opt)} className={`w-full rounded-xl border p-3 text-left text-sm ${cls}`}>{opt}</button></li>;
        })}
      </ul>
      {picked && <button type="button" onClick={next} className="w-full rounded-full bg-brand py-2 font-semibold text-white">{i + 1 >= questions.length ? '결과 보기' : '다음'}</button>}
    </section>
  );
}

function Recall({ turns, onWrong, onDone }: { turns: Turn[]; onWrong: (t: Turn) => void; onDone: (r: { correct: number; total: number }) => void }) {
  const cards = useMemo(() => shuffle(turns), [turns]);
  const rate = useSettingsStore((s) => s.rate);
  const voiceUri = useSettingsStore((s) => s.voiceUri);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const t = cards[i];
  if (!t) return <p className="text-sm text-slate-500">카드가 없습니다.</p>;
  const grade = (ok: boolean) => {
    if (ok) setCorrect((n) => n + 1); else onWrong(t);
    if (i + 1 >= cards.length) onDone({ correct: ok ? correct + 1 : correct, total: cards.length });
    else { setI(i + 1); setFlipped(false); }
  };
  return (
    <section className="space-y-3">
      <div className="text-xs text-slate-500">카드 {i + 1}/{cards.length}</div>
      <div className="card min-h-40 grid place-items-center text-center">
        {!flipped ? <div><p className="text-lg font-semibold">{t.ko}</p><p className="mt-2 text-xs text-slate-500">영어로 말해 본 뒤 뒤집어 확인하세요.</p></div>
          : <div><p className="text-sm text-slate-500">{t.ko}</p><p lang="en" className="mt-2 font-en text-xl">{t.en}</p><button type="button" onClick={() => speak(t.en, rate, voiceUri)} className="mt-2 text-brand"><Icon name="speaker" size={16} /></button></div>}
      </div>
      {!flipped ? <button type="button" onClick={() => setFlipped(true)} className="w-full rounded-full bg-brand py-2 font-semibold text-white">뒤집기</button>
        : <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => grade(false)} className="rounded-xl border-2 border-red-300 bg-red-50 py-3 font-bold text-red-700">못함</button><button type="button" onClick={() => grade(true)} className="rounded-xl border-2 border-brand bg-brand-50 py-3 font-bold text-brand">맞음</button></div>}
    </section>
  );
}

function Shadow({ turns, done, onDone }: { turns: Turn[]; done: boolean; onDone: () => void }) {
  const rate = useSettingsStore((s) => s.rate);
  const voiceUri = useSettingsStore((s) => s.voiceUri);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const mark = (i: number) => setChecked((s) => new Set(s).add(i));
  return (
    <section className="space-y-2">
      <p className="text-sm text-slate-600">문장을 듣고 바로 따라 말해 보세요.</p>
      {turns.map((t, i) => (
        <div key={i} className={`card !p-3 ${checked.has(i) ? 'border-brand-200 bg-brand-50' : ''}`}>
          <div className="flex items-start gap-2">
            <button type="button" onClick={() => speak(t.en, rate, voiceUri)} className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand text-white"><Icon name="speaker" size={14} /></button>
            <div className="min-w-0 flex-1"><p lang="en" className="font-en text-lg">{t.en}</p><p className="text-sm text-slate-600">{t.ko}</p></div>
            <button type="button" onClick={() => mark(i)} className={`rounded-full px-2 py-1 text-xs font-semibold ${checked.has(i) ? 'bg-brand text-white' : 'border border-slate-200 text-slate-500'}`}>{checked.has(i) ? '완료' : '따라 했어요'}</button>
          </div>
        </div>
      ))}
      {checked.size === turns.length && !done && <button type="button" onClick={onDone} className="w-full rounded-full bg-brand py-2 font-semibold text-white">따라 말하기 마치기</button>}
      {done && <p className="text-sm font-semibold text-brand">따라 말하기 완료</p>}
    </section>
  );
}
