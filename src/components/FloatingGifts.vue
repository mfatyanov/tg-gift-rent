<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch, type ComponentPublicInstance } from 'vue'
import DecorShape from './DecorShape.vue'
import { between, seededRandom } from '../lib/random'
import { requestFrame, useScrollFrame } from '../composables/useScrollFrame'
import { FINE_POINTER, MOBILE, useMediaQuery, useReducedMotion } from '../composables/useMediaQuery'

type Glyph = string | { shape: 'box' | 'gem' | 'spark' }

const GLYPHS: Glyph[] = [
  '🎁', '💎', { shape: 'box' }, '🧸', '🎩', '⭐', { shape: 'spark' }, '💝',
  '🍑', '🔮', { shape: 'gem' }, '🕯️', '🎀', '⌚',
]
const DESKTOP_COUNT = 14
const MOBILE_COUNT = 9
// запас сверху и снизу, чтобы элемент «переезжал» с края на край за пределами экрана
const MARGIN = 90

interface Gift {
  glyph: Glyph
  /** позиция по горизонтали, % ширины экрана */
  left: number
  /** стартовая позиция по вертикали, доля высоты */
  top: number
  size: number
  /** 0 — далеко, 1 — близко: влияет на размер, прозрачность, blur и параллакс */
  depth: number
  duration: number
  delay: number
  variant: number
}

const isMobile = useMediaQuery(MOBILE)
const finePointer = useMediaQuery(FINE_POINTER)
const reduced = useReducedMotion()

function makeGifts(mobile: boolean): Gift[] {
  const rand = seededRandom(mobile ? 7 : 42)
  const count = mobile ? MOBILE_COUNT : DESKTOP_COUNT
  // На мобильном — прижаты к краям, на десктопе — по бокам от колонки контента
  const [edgeMin, edgeMax] = mobile ? [-2, 9] : [2, 20]
  const maxSize = mobile ? 56 : 72

  return Array.from({ length: count }, (_, i) => {
    const depth = between(rand, 0.15, 1)
    const offset = between(rand, edgeMin, edgeMax)
    return {
      glyph: GLYPHS[i % GLYPHS.length]!,
      left: i % 2 === 0 ? offset : 100 - offset,
      top: (i + between(rand, 0.1, 0.9)) / count,
      size: Math.round(24 + depth * (maxSize - 24)),
      depth,
      duration: between(rand, 6, 12),
      delay: -between(rand, 0, 12),
      variant: i % 3,
    }
  })
}

const gifts = computed(() => makeGifts(isMobile.value))
const els: HTMLElement[] = []

function setEl(el: Element | ComponentPublicInstance | null, i: number) {
  if (el instanceof HTMLElement) els[i] = el
}

// позиция до первого кадра — чтобы декор не «прыгал» из верхнего угла
const initialY = (g: Gift) => Math.round(g.top * (window.innerHeight + MARGIN * 2) - MARGIN)

let mouseX = 0
let mouseY = 0

function update() {
  const range = window.innerHeight + MARGIN * 2
  const scroll = reduced.value ? 0 : window.scrollY
  const mx = reduced.value ? 0 : mouseX
  const my = reduced.value ? 0 : mouseY

  gifts.value.forEach((g, i) => {
    const el = els[i]
    if (!el) return
    // скролл-параллакс: дальние двигаются медленнее, с бесшовным «переносом» за краем экрана
    const speed = 0.06 + g.depth * 0.22
    const raw = g.top * range - scroll * speed
    const y = (((raw % range) + range) % range) - MARGIN + my * g.depth * 18
    const x = mx * g.depth * 28
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
  })
}

useScrollFrame(update)
watch([gifts, reduced], () => requestFrame(), { flush: 'post' })

function onPointerMove(e: PointerEvent) {
  if (!finePointer.value || reduced.value) return
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = (e.clientY / window.innerHeight) * 2 - 1
  requestFrame()
}

onMounted(() => window.addEventListener('pointermove', onPointerMove, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointermove', onPointerMove))
</script>

<template>
  <div class="gifts" aria-hidden="true">
    <div
      v-for="(g, i) in gifts"
      :key="`${isMobile}-${i}`"
      :ref="(el) => setEl(el, i)"
      class="gift"
      :style="{
        left: `${g.left}%`,
        marginLeft: `${-g.size / 2}px`,
        opacity: 0.3 + g.depth * 0.4,
        zIndex: Math.round(g.depth * 10),
        transform: `translate3d(0, ${initialY(g)}px, 0)`,
      }"
    >
      <div
        class="gift__inner"
        :class="`gift__inner--${g.variant}`"
        :style="{
          fontSize: `${g.size}px`,
          animationDuration: `${g.duration.toFixed(1)}s`,
          animationDelay: `${g.delay.toFixed(1)}s`,
          filter: g.depth < 0.45 ? `blur(${g.depth < 0.3 ? 3 : 1.5}px)` : undefined,
        }"
      >
        <template v-if="typeof g.glyph === 'string'">{{ g.glyph }}</template>
        <DecorShape v-else :kind="g.glyph.shape" :size="g.size" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gifts {
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  opacity: var(--decor-opacity);
}

.gift {
  position: absolute;
  top: 0;
  will-change: transform;
}

.gift__inner {
  line-height: 1;
  user-select: none;
  animation: bob-0 9s ease-in-out infinite alternate;
}

.gift__inner--1 {
  animation-name: bob-1;
}

.gift__inner--2 {
  animation-name: bob-2;
  animation-direction: alternate-reverse;
}

.gift__inner :deep(svg) {
  display: block;
}

@keyframes bob-0 {
  from { transform: translateY(-10px) rotate(-6deg); }
  to { transform: translateY(10px) rotate(6deg); }
}

@keyframes bob-1 {
  from { transform: translateY(-14px) rotate(9deg); }
  to { transform: translateY(12px) rotate(-9deg); }
}

@keyframes bob-2 {
  from { transform: translateY(-8px) rotate(-12deg); }
  to { transform: translateY(14px) rotate(4deg); }
}
</style>
