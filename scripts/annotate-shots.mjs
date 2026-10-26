// Обрезает и размечает скриншоты шагов по scripts/shots.config.mjs.
// Рендерит разметку в установленном Chrome (через playwright-core), отдельный браузер не скачивается.
// Пишет картинки в public/steps/ и их размеры в src/shots.json (чтобы страница не «прыгала» при загрузке).

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { chromium } from 'playwright-core'
import shots from './shots.config.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SRC_DIR = path.join(root, 'screenshots-src')
const OUT_DIR = path.join(root, 'public/steps')
const SIZES_FILE = path.join(root, 'src/shots.json')

const PINK = '#EC4899'
const RED = '#F43F5E'
const BADGE_R = 15

function markup(shot, dataUrl, width, height) {
  const [top, bottom] = shot.crop
  const h = bottom - top
  const marks = shot.marks ?? []
  const rect = ([l, t, r, b], pad = 0) => ({ x: l - pad, y: t - top - pad, w: r - l + pad * 2, h: b - t + pad * 2 })
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
  const badge = (cx, cy, color, text) => {
    const x = clamp(cx, BADGE_R + 2, width - BADGE_R - 2)
    const y = clamp(cy, BADGE_R + 2, h - BADGE_R - 2)
    return `<circle cx="${x}" cy="${y}" r="${BADGE_R}" fill="${color}" stroke="#fff" stroke-width="2"/>
      <text x="${x}" y="${y}" fill="#fff" font-size="17" font-weight="800" text-anchor="middle" dominant-baseline="central"
        font-family="system-ui, -apple-system, sans-serif">${text}</text>`
  }

  const highlights = marks.filter((m) => m.type !== 'blur')
  const holes = highlights
    .map((m) => rect(m.box, 2))
    .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="12" fill="#000"/>`)
    .join('')

  const blurs = marks
    .filter((m) => m.type === 'blur')
    .map((m) => rect(m.box))
    .map(
      (r) => `<div style="position:absolute;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;
        border-radius:12px;backdrop-filter:blur(14px);background:rgba(30,32,44,.35)"></div>`,
    )
    .join('')

  const strokes = highlights
    .map((m) => {
      const r = rect(m.box)
      const color = m.type === 'avoid' ? RED : PINK
      const fill = m.type === 'avoid' ? 'rgba(244,63,94,.14)' : 'none'
      let out = `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="12" fill="${fill}"
        stroke="${color}" stroke-width="4" filter="url(#glow-${m.type})"/>`
      // значок в углу: у avoid по умолчанию справа, у focus — слева
      const corner = m.corner ?? (m.type === 'avoid' ? 'right' : 'left')
      const cx = corner === 'right' ? r.x + r.w : r.x
      if (m.type === 'avoid') out += badge(cx, r.y, RED, '✕')
      else if (m.label) out += badge(cx, r.y, PINK, m.label)
      return out
    })
    .join('')

  return `<!doctype html><html><body style="margin:0;background:#000">
    <div id="shot" style="position:relative;width:${width}px;height:${h}px;overflow:hidden">
      <img src="${dataUrl}" style="position:absolute;left:0;top:${-top}px;width:${width}px;height:${height}px">
      ${blurs}
      <svg width="${width}" height="${h}" style="position:absolute;inset:0">
        <defs>
          <mask id="dim"><rect width="100%" height="100%" fill="#fff"/>${holes}</mask>
          <filter id="glow-focus" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${PINK}" flood-opacity=".9"/>
          </filter>
          <filter id="glow-avoid" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="${RED}" flood-opacity=".7"/>
          </filter>
        </defs>
        ${highlights.length ? '<rect width="100%" height="100%" fill="#000" fill-opacity=".45" mask="url(#dim)"/>' : ''}
        ${strokes}
      </svg>
    </div>
  </body></html>`
}

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ deviceScaleFactor: 1 })
const sizes = {}

for (const shot of shots) {
  const buf = await readFile(path.join(SRC_DIR, shot.src))
  const dataUrl = `data:image/jpeg;base64,${buf.toString('base64')}`

  await page.setContent(`<img id="probe" src="${dataUrl}">`)
  const { width, height } = await page.$eval('#probe', (img) => ({ width: img.naturalWidth, height: img.naturalHeight }))

  await page.setViewportSize({ width, height: shot.crop[1] - shot.crop[0] })
  await page.setContent(markup(shot, dataUrl, width, height))
  await page.locator('#shot').screenshot({ path: path.join(OUT_DIR, shot.out), type: 'jpeg', quality: 86 })

  sizes[shot.out] = [width, shot.crop[1] - shot.crop[0]]
  console.log(`✓ ${shot.out}  ${width}×${sizes[shot.out][1]}`)
}

await browser.close()
await writeFile(SIZES_FILE, JSON.stringify(sizes, null, 2) + '\n')
console.log(`размеры → ${path.relative(root, SIZES_FILE)}`)
