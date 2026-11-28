import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadMeta } from '../lib/contentLoader';
import { streak, useProgressStore } from '../stores/useProgressStore';
import { useReviewStore } from '../stores/useReviewStore';
import type { LessonMeta } from '../types/lesson';
import Icon from '../components/Icon';

export default function HomePage() {
  const [meta, setMeta] = useState<LessonMeta[]>([]);
  const prog = useProgressStore();
  const reviewCount = useReviewStore((s) => s.items.length);
  useEffect(() => { void loadMeta().then(setMeta); }, []);
  const next = useMemo(() => meta.find((m) => !prog.done[m.id]) ?? meta.find((m) => m.id === prog.last) ?? meta[0], [meta, prog.done, prog.last]);
  const done = Object.keys(prog.done).length;
  const pct = meta.length ? Math.round((done / meta.length) * 100) : 0;

  return (
    <main className="p-4 pb-28 space-y-4">
      <section className="rounded-2xl bg-brand p-5 text-white">
        <p className="text-xs opacity-80">매일 한 과, 영어로 말하기</p>
        <h1 className="mt-1 text-2xl font-bold">대화로 익히는 영어</h1>
        <p className="mt-2 text-sm opacity-90">상황별 대화를 듣고, 핵심 문장과 단어를 확인하고, 롤플레이로 말해 보세요.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {next && (
            <Link to={`/lesson/${next.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand">
              <Icon name="play" size={16} /> {done ? '이어서 학습' : '첫 과 시작'}
            </Link>
          )}
          <Link to="/path" className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold">
            <Icon name="map" size={16} /> 학습 경로
          </Link>
        </div>
      </section>

      <section className="card flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand"><Icon name="flame" size={22} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">연속 학습 {streak(prog.days)}일</p>
          <p className="text-xs text-slate-500">오늘 한 과를 마치면 기록이 이어져요.</p>
        </div>
      </section>

      {next && (
        <Link to={`/lesson/${next.id}`} className="card flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand"><Icon name="headphones" size={22} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500">오늘의 학습 · Vol.{next.vol} {next.no}과</p>
            <p className="font-semibold truncate">{next.titleKo}</p>
            <p className="text-xs text-slate-500 truncate">{next.titleEn}</p>
          </div>
          <Icon name="chevronRight" size={18} className="text-slate-400" />
        </Link>
      )}

      {next && (
        <Link to={`/daily?id=${next.id}`} className="card flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand"><Icon name="timer" size={22} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500">10분 데일리</p>
            <p className="font-semibold">6단계로 대화 듣기</p>
            <p className="text-xs text-slate-500">자막 없이 → 스크립트 → 따라 말하기</p>
          </div>
          <Icon name="chevronRight" size={18} className="text-slate-400" />
        </Link>
      )}

      {next && (
        <Link to={`/mastery?id=${next.id}`} className="card flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand"><Icon name="target" size={22} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500">심화 학습</p>
            <p className="font-semibold">듣고 이해 → 떠올리기 → 따라 말하기</p>
          </div>
          <Icon name="chevronRight" size={18} className="text-slate-400" />
        </Link>
      )}

      <Link to="/review" className="card flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand"><Icon name="repeat" size={22} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500">복습</p>
          <p className="font-semibold">{reviewCount ? `틀린 문장 ${reviewCount}개` : '틀린 문장이 생기면 여기에 모여요'}</p>
        </div>
        <Icon name="chevronRight" size={18} className="text-slate-400" />
      </Link>

      <section className="card space-y-2">
        <div className="flex items-baseline justify-between">
          <h2 className="font-bold">학습 진도</h2>
          <span className="text-sm text-slate-500">{done}/{meta.length}과 · {pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-2 pt-1 text-center">
          {[1, 2, 3, 4].map((level) => {
            const rows = meta.filter((m) => m.level === level);
            const n = rows.filter((m) => prog.done[m.id]).length;
            return <div key={level} className="rounded-xl bg-slate-50 p-2"><p className="text-xs text-slate-500">Level {level}</p><p className="font-semibold">{n}/{rows.length}</p></div>;
          })}
        </div>
      </section>

      <p className="text-center text-xs text-slate-400">EngSpeak · 12권 240과</p>
    </main>
  );
}
