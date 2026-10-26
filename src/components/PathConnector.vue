<script setup lang="ts">
import { useId, useTemplateRef } from 'vue'
import { useScrollFrame } from '../composables/useScrollFrame'
import { prefersReducedMotion } from '../composables/useMediaQuery'

// Пунктирная линия между шагами, «прорисовывается» по мере скролла:
// маска со сплошной линией и stroke-dashoffset открывает пунктир сверху вниз.
const HEIGHT = 64
const id = useId()
const root = useTemplateRef('root')
const reveal = useTemplateRef('reveal')

useScrollFrame(() => {
  if (!root.value || !reveal.value) return
  let progress = 1
  if (!prefersReducedMotion()) {
    const rect = root.value.getBoundingClientRect()
    const line = window.innerHeight * 0.82
    progress = Math.min(Math.max((line - rect.top) / rect.height, 0), 1)
  }
  reveal.value.style.strokeDashoffset = String(1 - progress)
})
</script>

<template>
  <div ref="root" class="connector" aria-hidden="true">
    <svg :height="HEIGHT" width="24" :viewBox="`0 0 24 ${HEIGHT}`">
      <defs>
        <linearGradient :id="`${id}-g`" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" :y2="HEIGHT">
          <stop offset="0" stop-color="#a78bfa" />
          <stop offset="1" stop-color="#ec4899" />
        </linearGradient>
        <mask :id="`${id}-m`" maskUnits="userSpaceOnUse" x="0" y="0" width="24" :height="HEIGHT">
          <line
            ref="reveal"
            x1="12" y1="0" x2="12" :y2="HEIGHT"
            stroke="#fff" stroke-width="8"
            pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
          />
        </mask>
      </defs>
      <g :mask="`url(#${id}-m)`">
        <line
          x1="12" y1="4" x2="12" :y2="HEIGHT - 4"
          :stroke="`url(#${id}-g)`" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 9"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.connector {
  display: flex;
  justify-content: center;
  padding-block: 6px;
}

.connector svg {
  display: block;
  overflow: visible;
}
</style>
