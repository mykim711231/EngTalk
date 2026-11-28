import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadLesson, loadMeta } from '../lib/contentLoader';
import { speakAsync, stopSpeak } from '../lib/tts';
import { useProgressStore } from '../stores/useProgressStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import type { Dialog, Lesson, LessonMeta, Turn } from '../types/lesson';
import Icon from '../components/Icon';

type Tab = 'dialog' | 'core' | 'vocab' | 'practice';
const TABS: [Tab, string][] = [['dialog', '대화'], ['core', '표현'], ['vocab', '단어'], ['practice', '연습']];
const chip = (on: boolean) => `rounded-full border px-3 py-1.5 text-sm font-semibold ${on ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white text-slate-600'}`;

export default function LessonPage() {
  const { id = '' } = useParams();
  const [lesson, setLesson] = useState<Lesson | null | undefined>(undefined);
  const [meta, setMeta] = useState<LessonMeta[]>([]);
  const [tab, setTab] = useState<Tab>('dialog');
  const [showAnswers, setShowAnswers] = useState(false);
  const [playing, setPlaying] = useState<{ kind: string; idx: number } | null>(null);
  const token = useRef(0);
  const settings = useSettingsStore();
  const { done, markDone, setLast } = useProgressStore();

  useEffect(() => { void loadMeta().then(setMeta); }, []);
  useEffect(() => {
    let active = true;
    setLesson(undefined);
    setTab('dialog');
    setShowAnswers(false);
    if (id) void loadLesson(id).then((l) => { if (active) { setLesson(l ?? null); if (l) setLast(l.id); } });
    return () => { active = false; stopSpeak(); token.current++; };
  }, [id, setLast]);

  const stopAll = () => {
    token.current++;
    stopSpeak();
    setPlaying(null);
  };

  const playDialog = async (d: Dialog) => {
    if (playing?.kind === d.kind) { stopAll(); return; }
    const my = ++token.current;
    setPlaying({ kind: d.kind, idx: 0 });
    for (let i = 0; i < d.turns.length; i++) {
      if (my !== token.current) return;
      setPlaying({ kind: d.kind, idx: i });
      await speakAsync(d.turns[i].en, settings.rate, settings.voiceUri);
      if (my !== token.current) return;
      await new Promise((r) => setTimeout(r, 350));
    }
    if (my === token.current) setPlaying(null);
  };

  const playText = async (kind: string, idx: number, text: string) => {
    stopAll();
    setPlaying({ kind, idx });
    await speakAsync(text, settings.rate, settings.voiceUri);
    setPlaying((p) => (p?.kind === kind && p.idx === idx ? null : p));
  };

  const { prev, next } = useMemo(() => {
    const i = meta.findIndex((m) => m.id === id);
    return { prev: i > 0 ? meta[i - 1] : undefined, next: i >= 0 ? meta[i + 1] : undefined };
  }, [meta, id]);

  if (lesson === undefined) return <main className="p-4">불러오는 중…</main>;
  if (lesson === null) return <main className="p-4">과를 찾을 수 없습니다. <Link to="/path" className="text-brand">목록으로</Link></main>;

  const isDone = !!done[lesson.id];
  const selectTab = (t: Tab) => { if (t !== tab) { stopAll(); setTab(t); } };

  return (
    <main className="p-4 pb-28 space-y-4">
      <Link to="/path" className="inline-flex items-center gap-1 text-sm text-slate-500"><Icon name="chevronLeft" size={16} /> 학습 경로</Link>

      <header>
        <p className="text-xs font-semibold text-brand">Vol.{lesson.vol} · {lesson.no}과</p>
        <h1 className="mt-1 text-xl font-bold">
          {lesson.titleKo} <span lang="en" className="font-en font-normal text-slate-500">· {lesson.titleEn}</span>
        </h1>
        <p className="mt-1 text-xs text-slate-500">Level {lesson.level}</p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Link to={`/daily?id=${lesson.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-sm font-semibold text-white">
          <Icon name="timer" size={14} /> 10분 데일리
        </Link>
        <Link to={`/mastery?id=${lesson.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-brand px-3 py-1.5 text-sm font-semibold text-brand">
          <Icon name="target" size={14} /> 심화 학습
        </Link>
        <button type="button" onClick={() => { if (playing) stopAll(); else if (lesson.dialogs[0]) void playDialog(lesson.dialogs[0]); }} className={chip(!!playing)} disabled={!lesson.dialogs[0]}>
          <span className="inline-flex items-center gap-1"><Icon name={playing ? 'stop' : 'play'} size={14} /> 기본 대화 듣기</span>
        </button>
        <button type="button" onClick={() => { if (playing) stopAll(); else if (lesson.dialogs[1]) void playDialog(lesson.dialogs[1]); }} className={chip(false)} disabled={!lesson.dialogs[1]}>
          <span className="inline-flex items-center gap-1"><Icon name={playing ? 'stop' : 'play'} size={14} /> 응용 대화 듣기</span>
        </button>
        <button
          type="button"
          onClick={() => { if (!isDone) markDone(lesson.id); }}
          className={`ml-auto rounded-full px-3 py-1.5 text-sm font-semibold ${isDone ? 'bg-green-100 text-green-800' : 'border border-brand text-brand'}`}
        >
          {isDone ? '완료됨' : '학습 완료'}
        </button>
      </div>

      <div role="tablist" aria-label="학습 영역" className="flex gap-1 overflow-x-auto overflow-y-hidden border-b border-slate-200">
        {TABS.map(([k, label]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => selectTab(k)}
            className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-sm font-semibold ${tab === k ? 'border-brand text-brand' : 'border-transparent text-slate-500'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={settings.showEn} className={chip(settings.showEn)} onClick={() => settings.toggle('showEn')}>영어</button>
        <button type="button" aria-pressed={settings.showKo} className={chip(settings.showKo)} onClick={() => settings.toggle('showKo')}>한글</button>
        <button type="button" aria-pressed={settings.showChunks} className={chip(settings.showChunks)} onClick={() => settings.toggle('showChunks')}>의미단위</button>
        {playing && <span className="self-center text-xs text-slate-500">재생 중</span>}
      </div>

      {tab === 'dialog' && (
        <div className="space-y-4">
          <section className="card">
            <h2 className="text-sm font-bold text-brand">학습 목표</h2>
            <p className="mt-1 text-sm text-slate-700">{lesson.goals['말하기 목표']}</p>
            <p className="mt-1 text-xs text-slate-500">{lesson.goals['핵심 문법']}</p>
          </section>
          {lesson.dialogs.map((d) => (
            <section key={d.kind} className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-brand">{d.kind === 'basic' ? '기본 대화' : '응용 대화'}</h2>
                <button type="button" className="text-xs text-slate-500" onClick={() => void playDialog(d)}>
                  {playing?.kind === d.kind ? '멈추기' : '전체 듣기'}
                </button>
              </div>
              {d.turns.map((t, i) => (
                <DialogueLine key={i} turn={t} playing={playing?.kind === d.kind && playing.idx === i} showEn={settings.showEn} showKo={settings.showKo} showChunks={settings.showChunks} onPlay={() => void playText(d.kind, i, t.en)} />
              ))}
            </section>
          ))}
        </div>
      )}

      {tab === 'core' && (
        <div className="space-y-4">
          {[['필수 표현', lesson.core.required], ['확장 표현', lesson.core.expanded]].map(([title, rows]) => (
            <section key={String(title)} className="space-y-2">
              <h2 className="text-sm font-bold text-brand">{String(title)}</h2>
              {(rows as typeof lesson.core.required).map((c, i) => (
                <div key={i} className={`card !p-3 ${playing?.kind === 'core' && playing.idx === i ? 'ring-2 ring-brand' : ''}`}>
                  <div className="flex items-start gap-2">
                    <button type="button" aria-label="듣기" onClick={() => void playText('core', i, c.text)} className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand text-white"><Icon name="speaker" size={14} /></button>
                    <div>
                      {settings.showEn && <p lang="en" className="font-en text-lg leading-snug">{settings.showChunks ? c.chunks.join(' / ') : c.text}</p>}
                      {settings.showKo && <p className="text-sm text-slate-600">{c.ko}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ))}
          <section className="card">
            <h2 className="text-sm font-bold text-brand">문장 구조</h2>
            <dl className="mt-2 space-y-2 text-sm">
              {Object.entries(lesson.structure).map(([k, v]) => <div key={k}><dt className="text-xs font-semibold text-slate-500">{k}</dt><dd className="text-slate-800">{v}</dd></div>)}
            </dl>
          </section>
          <section className="card">
            <h2 className="text-sm font-bold text-brand">발음 포인트</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{lesson.pronunciation}</p>
          </section>
        </div>
      )}

      {tab === 'vocab' && (
        <ul className="space-y-2">
          {lesson.vocab.map((v, i) => (
            <li key={i} className={`card !p-3 ${playing?.kind === 'vocab' && playing.idx === i ? 'ring-2 ring-brand' : ''}`}>
              <div className="flex items-start gap-2">
                <button type="button" aria-label="듣기" onClick={() => void playText('vocab', i, v.term)} className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand text-white"><Icon name="speaker" size={14} /></button>
                <div className="min-w-0">
                  <p lang="en" className="font-en text-lg font-semibold">{v.term} <span className="font-sans text-xs text-slate-500">/{v.ipa}/</span></p>
                  <p className="text-sm text-slate-700">{v.meaning}</p>
                  <p lang="en" className="mt-1 text-sm text-slate-800">{v.example}</p>
                  <p className="text-xs text-slate-500">{v.translation}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tab === 'practice' && (
        <div className="space-y-4">
          <section className="card space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-brand">복습</h2>
              <button type="button" className="text-xs text-brand underline" onClick={() => setShowAnswers((v) => !v)}>{showAnswers ? '정답 숨기기' : '정답 보기'}</button>
            </div>
            {lesson.review.questions.map((q) => (
              <div key={q.no}>
                <p className="text-sm font-medium">{q.no}. {q.prompt}</p>
                {q.choices.length > 0 && <ul className="mt-1 space-y-1 text-sm text-slate-600">{q.choices.map((c) => <li key={c.key}>{c.key}. {c.text}</li>)}</ul>}
              </div>
            ))}
            {showAnswers && <div className="rounded-xl bg-brand-50 p-3 text-sm text-slate-800">{lesson.review.answers.map((a, i) => <p key={i}>{a}</p>)}</div>}
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-brand">듣고 답하기</h2>
            {lesson.roleplays.map((r, i) => (
              <article key={i} className="card space-y-2">
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm"><span className="text-xs text-slate-500">상대 음성 </span>{r.partner}</p>
                <p className="text-sm"><span className="text-xs text-slate-500">힌트 </span>{r.hint}</p>
                <p className="rounded-lg bg-brand-50 p-2 text-sm"><span className="text-xs text-slate-500">예시 답변 </span>{r.example}</p>
                <p className="text-xs text-slate-500">확인 · {r.check}</p>
              </article>
            ))}
          </section>
        </div>
      )}

      <nav className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
        {prev ? <Link to={`/lesson/${prev.id}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm">← 이전</Link> : <span />}
        <Link to="/path" className="text-sm text-slate-500 underline">목차</Link>
        {next ? <Link to={`/lesson/${next.id}`} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">다음 →</Link> : <span />}
      </nav>
    </main>
  );
}

function DialogueLine({ turn, playing, showEn, showKo, showChunks, onPlay }: { turn: Turn; playing: boolean; showEn: boolean; showKo: boolean; showChunks: boolean; onPlay: () => void }) {
  return (
    <div className={`rounded-xl border p-3 ${playing ? 'border-brand bg-brand-50' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start gap-2">
        <button type="button" aria-label="듣기" onClick={onPlay} className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand text-white"><Icon name="speaker" size={14} /></button>
        <div className="min-w-0">
          <p className="text-xs text-slate-500">{turn.speaker}</p>
          {showEn && <p lang="en" className="font-en text-lg leading-snug">{showChunks ? turn.chunks.join(' / ') : turn.chunks.join(' ')}</p>}
          {showKo && <p className="text-sm text-slate-600">{turn.ko}</p>}
        </div>
      </div>
    </div>
  );
}
