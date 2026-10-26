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
| Название бренда | `brand.name` в `src/content.ts` (попадает и в `<title>`, и в og-теги) |
| Цвета, шрифты, тёмная/светлая тема | токены в начале `src/styles/global.css` |
| Скриншоты шагов | `public/steps/step-N.png` |

Мини-разметка в текстах `content.ts`:

- `**жирный**`
- `[[Connect TON]]` — «псевдокнопка»-чип, как кнопка на сайте (нажать нельзя)
- `[[!Transfer to Telegram]]` — красный чип для кнопки, которую нажимать **нельзя**
- `` `tc://` `` — моноширинный текст
- `[fragment.com](https://fragment.com)` — ссылка

## Скриншоты

Положите PNG в `public/steps/`. Пока файла нет, на его месте показывается плейсхолдер «скриншот шага N».
Рамка «телефона» имеет пропорции **9:16** (например, 1080×1920), картинка прижимается к верху и обрезается
снизу. Лучше снимать с телефона в обычном браузере и выделять нужную кнопку яркой обводкой или стрелкой.

| Файл | Что на нём |
|---|---|
| `step-1.png` | fragment.com, выполнен вход через Telegram (виден аккаунт в шапке) |
| `step-2.png` | Шапка Fragment, выделена кнопка **Connect TON** |
| `step-3.png` | Окно подключения кошелька: выделен значок QR-кода вверху (если нужно второе нажатие на кнопку QR-кода — стрелка «1 → 2» на одном кадре) |
| `step-4.png` | Открытый QR-код, выделена кнопка **Copy link** |
| `step-5.png` | Раздел **My Assets → Gifts** с подарком (можно показать открытое меню ☰ с пунктом My Assets) |
| `step-6.png` | Карточка подарка, выделена кнопка **Display to Telegram** (кнопку Transfer лучше перечеркнуть) |

Если меняете формат (например, `.webp`), поправьте путь в `src/components/PhoneShot.vue`.

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
    PhoneShot.vue            скриншот в рамке телефона или плейсхолдер
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
