# Инструкция для покупателей аренды NFT-подарков

Одностраничный лендинг на Vue 3 + TypeScript + Vite. Без бэкенда, без форм и без UI- и анимационных библиотек.
Сборка — статика в `dist/`.

## Команды

```bash
npm install        # установить зависимости (Node 20+)
npm run dev        # локальный сервер с hot reload: http://localhost:5173
npm run build      # проверка типов + сборка в dist/
npm run preview    # посмотреть готовую сборку: http://localhost:4173
```

## Где править

| Что | Где |
|---|---|
| Все тексты: hero, шаги, предупреждения, FAQ, футер | `src/content.ts` |
| Название бренда | `brand` в `src/content.ts`: `name` — для `<title>` и og-тегов, `label` — на странице (со ссылкой) |
| Цвета, шрифты, тёмная/светлая тема | токены в начале `src/styles/global.css` |
| Скриншоты шагов | `shots` у шагов в `src/content.ts`, разметка — `scripts/shots.config.mjs` |

Мини-разметка в текстах `content.ts`:

- `**жирный**`
- `[[Connect TON]]` — «псевдокнопка»-чип, как кнопка на сайте (нажать нельзя)
- `[[!Transfer to Telegram]]` — красный чип для кнопки, которую нажимать **нельзя**
- `` `tc://` `` — моноширинный текст
- `[fragment.com](https://fragment.com)` — ссылка

## Скриншоты

Готовые картинки лежат в `public/steps/`, к шагам они привязаны в `content.ts` (поле `shots`, до двух на шаг).
Шаг без скриншотов показывает плейсхолдер «скриншот шага N».

Картинки размечаются скриптом, руками ничего рисовать не нужно:

1. Положите исходные скрины с телефона в `screenshots-src/`. Эта папка не попадает ни в git, ни на сайт.
2. Опишите в `scripts/shots.config.mjs`, что обрезать и что выделить:
   - `crop` — какую полосу по высоте оставить;
   - `focus` — розовая обводка с цифрой (что нажать);
   - `avoid` — красная обводка с ✕ (что не нажимать);
   - `blur` — размыть (QR-код, имена, аватарки).
   Всё, что не выделено, слегка затемняется.
3. Запустите `npm run shots`. Скрипт запишет картинки в `public/steps/` и их размеры в `src/shots.json`.

Скрипт рендерит через установленный Google Chrome (`playwright-core`, отдельный браузер не скачивается).

| Файл | Что на нём |
|---|---|
| `step-1a.jpg` | Шапка Fragment, обведена кнопка меню ☰ (1) |
| `step-1b.jpg` | Низ открытого меню, обведена **Connect Telegram** (2) |
| `step-2.jpg` | Шапка Fragment, обведена **Connect TON** |
| `step-3.jpg` | Окно подключения: обведён значок QR вверху слева, **Connect Telegram** перечёркнута |
| `step-4.jpg` | Окно с QR-кодом (QR размыт), обведена **Copy Link** |
| `step-5.jpg` | My Assets → Gifts: обведены вкладка и подарок, **Transfer to Telegram** перечёркнута |
| `step-6a.jpg` | Строка подарка: обведены ⋮ (1), **Transfer to Telegram** перечёркнута |
| `step-6b.jpg` | Окно **Display on Telegram**: обведены аккаунт (2, имя размыто) и **Save** (3) |

## Деплой

`vite.config.ts` использует относительный `base: './'`, поэтому одна и та же сборка работает в корне домена
и в подпапке `/<repo>/`.

### GitHub Pages

1. Запушьте репозиторий на GitHub (ветка `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Каждый push в `main` запускает `.github/workflows/deploy.yml`, и сайт публикуется
   на `https://<user>.github.io/<repo>/`. Запустить вручную: вкладка **Actions → Deploy to GitHub Pages → Run workflow**.

### Vercel

Импортируйте репозиторий на vercel.com: Vite определится автоматически
(Build Command `npm run build`, Output Directory `dist`). Настраивать больше ничего не нужно.

## Что внутри

```
src/
  content.ts                 тексты страницы
  App.vue                    порядок блоков
  styles/global.css          токены темы, стекло, чипы, стикеры, reveal, reduced-motion
  components/
    HeroSection.vue          заголовок, бейджи, кнопка «Начать»
    BeforeStart.vue          «Перед началом»
    StepsSection.vue         части 1–2, шаги, плашка ожидания, путь между шагами
    StepCard.vue             карточка шага (номер, текст, скриншот)
    StepShot.vue             скриншот шага или плейсхолдер
    PathConnector.vue        пунктир между шагами, рисуется по скроллу
    WaitBanner.vue           «Ждите „Готово“ от продавца»
    StepNav.vue              «Шаг N из 6» снизу на мобильном, точки сбоку на десктопе
    DoneBlock.vue            «Готово!» + одноразовое конфетти
    WarningsBlock.vue        стикеры «частые ошибки»
    FaqSection.vue           аккордеон
    SiteFooter.vue
    FloatingGifts.vue        плавающий декор и параллакс
    BackgroundBlobs.vue      «дышащие» цветные пятна
    ScrollProgress.vue       полоса прогресса
    DecorShape.vue           собственные SVG (коробка, кристалл, искра)
    RichText.vue             рендер мини-разметки (без v-html)
  composables/               IntersectionObserver-reveal, общий rAF-скролл, media queries, активный шаг
```

### Анимации и производительность

- Анимируются только `transform` и `opacity`. Все scroll-эффекты считаются в одном общем `requestAnimationFrame`.
- Фоновые пятна — мягкий `radial-gradient`, а не `filter: blur(120px)`: выглядят так же, но не нагружают GPU слабых телефонов.
- `prefers-reduced-motion: reduce`: CSS-анимации выключены, появление блоков — простой fade,
  декор и пятна стоят на месте, путь между шагами нарисован сразу, конфетти нет, скролл без плавности.
