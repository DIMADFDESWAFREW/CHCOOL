import { Course, Exam } from "./types";

export const COURSES: Course[] = [
  { id: "figma", title: "Figma Start", tag: "design", level: "Beginner", cashbackPerExam: 150, xpPerExam: 120, lessons: 8, coverBadge: "ТОП" },
  { id: "ux", title: "UX-дизайн", tag: "design", level: "Beginner", cashbackPerExam: 200, xpPerExam: 140, lessons: 10, coverBadge: "NEW" },
  { id: "web", title: "Веб-дизайн", tag: "design", level: "Intermediate", cashbackPerExam: 220, xpPerExam: 160, lessons: 12, coverBadge: "HOT" },
  { id: "js", title: "JS для новичков", tag: "it", level: "Beginner", cashbackPerExam: 180, xpPerExam: 150, lessons: 9, coverBadge: "ТОП" },
  { id: "tg", title: "Telegram Mini Apps", tag: "it", level: "Intermediate", cashbackPerExam: 260, xpPerExam: 180, lessons: 11, coverBadge: "NEW" },
  { id: "ads", title: "Трафик и реклама", tag: "marketing", level: "Beginner", cashbackPerExam: 170, xpPerExam: 130, lessons: 7, coverBadge: "★" },
];

export const EXAMS: Record<string, Exam> = {
  figma: {
    title: "Figma Start: мини-экзамен",
    questions: [
      { q: "Что такое компонент в Figma?", a: 1, opts: ["Слой с тенью", "Переиспользуемый элемент UI", "Файл проекта", "Тип шрифта"] },
      { q: "Auto Layout нужен, чтобы…", a: 2, opts: ["Рисовать иконки", "Экспортировать PNG", "Автоматически располагать элементы", "Создавать сетку колонок"] },
      { q: "Что удобнее для кнопки: Frame или Component?", a: 1, opts: ["Frame", "Component", "Vector", "Boolean group"] },
    ],
  },
  ux: {
    title: "UX-дизайн: мини-экзамен",
    questions: [
      { q: "Главная цель UX?", a: 0, opts: ["Сделать удобно пользователю", "Сделать красиво", "Сделать дорого", "Сделать трендово"] },
      { q: "Что такое User Flow?", a: 1, opts: ["Цветовая схема", "Путь пользователя по экрану/сценарию", "Шрифт бренда", "Сетка 12 колонок"] },
      { q: "Лучший способ проверить гипотезу?", a: 2, opts: ["Угадать", "Спросить друга", "Тестировать на пользователях", "Поменять цвет кнопки"] },
    ],
  },
  web: {
    title: "Веб-дизайн: мини-экзамен",
    questions: [
      { q: "Что важнее на первом экране?", a: 2, opts: ["10 картинок", "Максимум текста", "Понятный оффер + CTA", "Сложные анимации"] },
      { q: "Что такое CTA?", a: 1, opts: ["Сетка", "Призыв к действию", "Формат файла", "Фрейм"] },
      { q: "Хороший контраст нужен для…", a: 0, opts: ["Читабельности", "Градиентов", "Теней", "Параллакса"] },
    ],
  },
  js: {
    title: "JS для новичков: мини-экзамен",
    questions: [
      { q: "let vs const: const означает…", a: 1, opts: ["Меняется всегда", "Нельзя переназначить", "Только для чисел", "Только в React"] },
      { q: "Что вернёт typeof [] ?", a: 0, opts: ["object", "array", "list", "undefined"] },
      { q: "Какой оператор сравнения строгий?", a: 2, opts: ["=", "==", "===", "=>"] },
    ],
  },
  tg: {
    title: "Telegram Mini Apps: мини-экзамен",
    questions: [
      { q: "Mini App в Telegram это…", a: 1, opts: ["APK файл", "Web-сайт внутри Telegram", "Расширение Chrome", "Бот без UI"] },
      { q: "Что такое initData?", a: 2, opts: ["Список курсов", "Ключ API", "Данные авторизации от Telegram", "Пароль пользователя"] },
      { q: "WebApp.expand() делает…", a: 0, opts: ["Разворачивает на всю высоту", "Закрывает приложение", "Чистит кэш", "Ставит лайк"] },
    ],
  },
  ads: {
    title: "Трафик и реклама: мини-экзамен",
    questions: [
      { q: "CTR это…", a: 1, opts: ["Скорость сайта", "Кликабельность объявления", "Цена клика", "Охват"] },
      { q: "Воронка нужна, чтобы…", a: 0, opts: ["Проводить пользователя к покупке", "Увеличить шрифт", "Сделать лого", "Снизить FPS"] },
      { q: "Лучше всего работает оффер, который…", a: 2, opts: ["Длинный", "Сложный", "Понятный и конкретный", "Без цифр"] },
    ],
  },
};
