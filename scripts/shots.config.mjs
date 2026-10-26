/**
 * Разметка скриншотов шагов. Запуск: npm run shots
 *
 * Исходники лежат в screenshots-src/ (не попадают в git и на сайт),
 * готовые картинки пишутся в public/steps/.
 * Координаты — в пикселях исходной картинки: [left, top, right, bottom].
 *
 *   crop   — какую полосу по высоте оставить: [top, bottom]
 *   focus  — розовая обводка (то, что нажать); label — цифра порядка нажатий
 *   avoid  — красная обводка с ✕ (то, что НЕ нажимать)
 *   blur   — размыть (QR-код, чужие имена и аватарки)
 *   corner — в каком углу значок: 'left' | 'right' (если значки соседних рамок налезают)
 *
 * Всё, что не focus/avoid, слегка затемняется, чтобы глаза не разбегались.
 */
export default [
  {
    src: '2026-10-26 19.28.17.jpg',
    out: 'step-1a.jpg',
    crop: [88, 400],
    marks: [{ type: 'focus', box: [522, 96, 580, 154], label: '1' }],
  },
  {
    src: '2026-10-26 19.28.21.jpg',
    out: 'step-1b.jpg',
    crop: [860, 1135],
    marks: [{ type: 'focus', box: [176, 1056, 572, 1116], label: '2' }],
  },
  {
    src: '2026-10-26 19.28.26.jpg',
    out: 'step-2.jpg',
    crop: [88, 400],
    marks: [{ type: 'focus', box: [320, 97, 518, 152] }],
  },
  {
    src: '2026-10-26 19.28.28.jpg',
    out: 'step-3.jpg',
    crop: [282, 1032],
    marks: [
      { type: 'focus', box: [18, 297, 78, 357] },
      { type: 'avoid', box: [40, 562, 550, 646] },
    ],
  },
  {
    src: '2026-10-26 19.28.31.jpg',
    out: 'step-4.jpg',
    crop: [300, 1012],
    marks: [
      { type: 'blur', box: [36, 436, 554, 892] },
      { type: 'focus', box: [305, 914, 556, 1002] },
    ],
  },
  {
    src: '2026-10-26 19.28.33.jpg',
    out: 'step-5.jpg',
    crop: [240, 600],
    marks: [
      { type: 'focus', box: [272, 306, 368, 358] },
      { type: 'focus', box: [18, 505, 264, 567] },
      { type: 'avoid', box: [269, 513, 476, 561] },
    ],
  },
  {
    src: '2026-10-26 19.28.33.jpg',
    out: 'step-6a.jpg',
    crop: [240, 600],
    marks: [
      { type: 'avoid', box: [269, 513, 476, 561], corner: 'left' },
      { type: 'focus', box: [478, 513, 530, 561], label: '1', corner: 'right' },
    ],
  },
  {
    src: '2026-10-26 19.28.36.jpg',
    out: 'step-6b.jpg',
    crop: [608, 1132],
    marks: [
      { type: 'blur', box: [68, 950, 300, 1012] },
      { type: 'focus', box: [55, 940, 535, 1019], label: '2' },
      { type: 'focus', box: [460, 1050, 540, 1100], label: '3' },
    ],
  },
]
