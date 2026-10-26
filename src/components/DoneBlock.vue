<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import RichText from './RichText.vue'
import { done } from '../content'
import { vReveal } from '../composables/vReveal'
import { prefersReducedMotion } from '../composables/useMediaQuery'

const CONFETTI = ['🎉', '🎉', '🎉', '🎊', '✨', '⭐', '🎁']
const PIECES = 26

const root = useTemplateRef('root')
const burst = useTemplateRef('burst')
let observer: IntersectionObserver | undefined

// Один всплеск конфетти, когда блок «Готово!» впервые попал в экран
function fireConfetti() {
  const layer = burst.value
  if (!layer || prefersReducedMotion()) return

  for (let i = 0; i < PIECES; i++) {
    const piece = document.createElement('span')
    piece.className = 'confetti__piece'
    piece.textContent = CONFETTI[i % CONFETTI.length]!
    piece.style.fontSize = `${18 + Math.random() * 18}px`
    layer.appendChild(piece)

    // разлёт веером вверх и в стороны, потом «падение»
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3
    const distance = 110 + Math.random() * 150
    const dx = Math.cos(angle) * distance
    const dy = Math.sin(angle) * distance
    const spin = (Math.random() - 0.5) * 540

    piece
      .animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.3)', opacity: 0 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${spin * 0.6}deg) scale(1)`, opacity: 1, offset: 0.45 },
          { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 180}px)) rotate(${spin}deg) scale(0.85)`, opacity: 0 },
        ],
        { duration: 1500 + Math.random() * 700, delay: Math.random() * 120, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)', fill: 'forwards' },
      )
      .finished.then(() => piece.remove())
  }
}

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      fireConfetti()
    },
    { threshold: 0.6 },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="done" ref="root" class="done container" aria-labelledby="done-title">
    <div v-reveal>
      <div class="done__card glass">
        <div class="done__emoji" aria-hidden="true">{{ done.emoji }}</div>
        <h2 id="done-title" class="done__title"><span class="grad-text">{{ done.title }}</span></h2>
        <p class="done__text"><RichText :text="done.text" /></p>
      </div>
    </div>
    <div ref="burst" class="confetti" aria-hidden="true" />
  </section>
</template>

<style scoped>
.done {
  position: relative;
  padding-block: 8px 40px;
}

.done__card {
  padding: 36px 24px 40px;
  background:
    radial-gradient(120% 90% at 50% 0%, rgb(236 72 153 / 0.22), transparent 60%),
    var(--glass);
  text-align: center;
}

.done__emoji {
  display: inline-block;
  font-size: 72px;
  line-height: 1;
  animation: done-wiggle 2.4s ease-in-out infinite;
}

@keyframes done-wiggle {
  0%, 100% { transform: rotate(-8deg) scale(1); }
  50% { transform: rotate(8deg) scale(1.08); }
}

.done__title {
  margin-top: 14px;
  font-size: clamp(40px, 12vw, 64px);
}

.done__text {
  margin-top: 10px;
  font-size: 19px;
  font-weight: 700;
}

.confetti {
  position: absolute;
  top: 42%;
  left: 50%;
  z-index: 3;
  width: 0;
  height: 0;
  pointer-events: none;
}

.confetti :deep(.confetti__piece) {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 1;
  opacity: 0;
  will-change: transform, opacity;
}
</style>
