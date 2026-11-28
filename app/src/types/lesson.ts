export type Turn = { speaker: 'A' | 'B'; en: string; ko: string; chunks: string[] };
export type Dialog = { kind: 'basic' | 'applied'; turns: Turn[] };
export type CoreLine = { en: string; text: string; ko: string; chunks: string[] };
export type Vocab = { term: string; ipa: string; meaning: string; example: string; translation: string };
export type Question = { no: number; prompt: string; choices: { key: string; text: string }[] };
export type Review = { questions: Question[]; answers: string[] };
export type Roleplay = { title: string; partner: string; hint: string; example: string; check: string };
export type Structure = Record<string, string>;

export type Lesson = {
  id: string;
  vol: number;
  no: number;
  level: number;
  titleKo: string;
  titleEn: string;
  goals: Record<string, string>;
  dialogs: Dialog[];
  core: { required: CoreLine[]; expanded: CoreLine[] };
  structure: Structure;
  vocab: Vocab[];
  pronunciation: string;
  review: Review;
  roleplays: Roleplay[];
};

export type LessonMeta = Pick<Lesson, 'id' | 'vol' | 'no' | 'level' | 'titleKo' | 'titleEn'>;
