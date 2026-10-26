<script setup lang="ts">
import { useId } from 'vue'

// Собственные простые SVG для декора (не графика Telegram).
defineProps<{ kind: 'box' | 'gem' | 'spark'; size: number }>()
const id = useId()
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient :id="`${id}-a`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a78bfa" />
        <stop offset="1" stop-color="#ec4899" />
      </linearGradient>
      <linearGradient :id="`${id}-b`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#67e8f9" />
        <stop offset="1" stop-color="#7c3aed" />
      </linearGradient>
    </defs>

    <g v-if="kind === 'box'">
      <rect x="10" y="28" width="44" height="28" rx="5" :fill="`url(#${id}-a)`" />
      <rect x="6" y="19" width="52" height="12" rx="4" :fill="`url(#${id}-a)`" opacity="0.85" />
      <rect x="28" y="19" width="8" height="37" :fill="`url(#${id}-b)`" />
      <path d="M32 19c-6-10-17-10-15-3 1 4 9 4 15 3Zm0 0c6-10 17-10 15-3-1 4-9 4-15 3Z" :fill="`url(#${id}-b)`" />
    </g>

    <g v-else-if="kind === 'gem'">
      <path d="M18 10h28l12 15-26 31L6 25Z" :fill="`url(#${id}-b)`" />
      <path d="M6 25h52M18 10l6 15 8 31 8-31 6-15M24 25l8-15 8 15" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="1.5" stroke-linejoin="round" />
    </g>

    <path
      v-else
      d="M32 4c2 15 7 22 26 28-19 6-24 13-26 28-2-15-7-22-26-28 19-6 24-13 26-28Z"
      :fill="`url(#${id}-a)`"
    />
  </svg>
</template>
