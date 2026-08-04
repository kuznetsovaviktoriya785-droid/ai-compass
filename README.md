# AI Compass

Современный лендинг для проекта **AI Compass** — навигатора в мире искусственного интеллекта.

## Стек

- React 19
- TypeScript
- Tailwind CSS 3
- Vite 6

## Запуск

```bash
npm install
npm run dev
```

Сайт будет доступен по адресу [http://localhost:5173](http://localhost:5173).

## Сборка

```bash
npm run build
npm run preview
```

## Структура проекта

```
├── public/
│   └── compass.svg          # Иконка сайта
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Навигационное меню
│   │   ├── Hero.tsx         # Главный экран
│   │   ├── About.tsx        # Блок «О проекте»
│   │   ├── Features.tsx     # Блок «Возможности»
│   │   ├── CTA.tsx          # Призыв к действию «Начать»
│   │   └── Footer.tsx       # Подвал
│   ├── App.tsx              # Главная страница
│   ├── main.tsx             # Точка входа
│   └── index.css            # Tailwind стили
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Разделы сайта

- **Hero** — заголовок, описание и кнопка «Начать»
- **О проекте** — миссия и ценности AI Compass
- **Возможности** — 6 ключевых функций платформы
- **CTA** — финальный призыв к действию

Сайт полностью адаптивен для мобильных устройств.
