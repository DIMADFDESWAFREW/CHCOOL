# School Arena — Telegram Mini App (MVP)

Это реальный шаблон проекта (Next.js + Tailwind + Framer Motion), сделанный как основа для школы-платформы в Telegram.

## 1) Запуск локально
1. Установи Node.js (LTS).
2. В терминале:
```bash
npm i
npm run dev
```
Открой: http://localhost:3000

## 2) Запуск в Telegram
1. Задеплой на Vercel (или любой HTTPS хостинг).
2. В BotFather:
- /setdomain → укажи домен
- /setmenubutton → WebApp URL

## 3) Что уже есть
- UI в стиле “платформа”: sidebar, баннер, карточки курсов
- Демоданные курсов
- Экзамен (модальное окно), награды (XP + “возврат”)
- Telegram WebApp SDK: expand(), чтение initDataUnsafe.user
- Хранение демо-стейта в localStorage

## 4) Что дальше подключаем
- Supabase/Backend для хранения прогресса, экзаменов, выплат
- Платежи (Telegram Payments / ЮKassa / TON)
- Админку/панель добавления курсов и экзаменов

— Том
