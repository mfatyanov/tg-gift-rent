<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useScrollFrame } from '../composables/useScrollFrame'

const bar = useTemplateRef('bar')

useScrollFrame(() => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
  if (bar.value) bar.value.style.transform = `scaleX(${progress})`
})
</script>

<template>
  <div class="progress" aria-hidden="true">
    <div ref="bar" class="progress__bar" />
  </div>
</template>

<style scoped>
.progress {
  position: fixed;
  inset: 0 0 auto;
  z-index: 30;
  height: 3px;
  pointer-events: none;
}

.progress__bar {
  height: 100%;
  background: linear-gradient(90deg, var(--violet), var(--pink), var(--cyan));
  box-shadow: 0 0 12px rgb(236 72 153 / 0.6);
  transform: scaleX(0);
  transform-origin: 0 50%;
  will-change: transform;
}
</style>
