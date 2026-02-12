export type Tag = "design" | "it" | "marketing";

export type Course = {
  id: string;
  title: string;
  tag: Tag;
  level: "Beginner" | "Intermediate";
  lessons: number;
  coverBadge: string;
  cashbackPerExam: number;
  xpPerExam: number;
};

export type Exam = {
  title: string;
  questions: { q: string; a: number; opts: string[] }[];
};

export type CourseState = {
  lessonsDone: number;
  examPassed: boolean;
};

export type AppState = {
  user: { name: string; initials: string };
  xp: number;
  level: number;
  cashback: number;
  streak: number;
  lastActiveDay: string | null;
  courses: Record<string, CourseState>;
};
