<script setup lang="ts">
import { computed, ref } from 'vue'
import sizes from '../shots.json'
import { ui, type Shot } from '../content'

// Скриншот шага в рамке. Пока файла нет (или он не загрузился) — плейсхолдер.
const props = defineProps<{ n: number; shot?: Shot }>()

const loaded = ref(false)
const failed = ref(false)

const size = computed(() => (props.shot ? (sizes as Record<string, number[]>)[props.shot.file] : undefined))
const showImage = computed(() => !!props.shot && !failed.value)
const src = computed(() => `${import.meta.env.BASE_URL}steps/${props.shot?.file}`)
// пропорции известны заранее (src/shots.json) — рамка не «прыгает», пока картинка грузится
const aspectRatio = computed(() => (size.value && showImage.value ? `${size.value[0]} / ${size.value[1]}` : undefined))
</script>

<template>
  <figure class="shot" :class="{ 'shot--placeholder': !showImage }" :style="{ aspectRatio }">
    <div
      v-if="!loaded"
      class="shot__placeholder"
      :role="showImage ? undefined : 'img'"
      :aria-label="showImage ? undefined : (shot?.alt ?? ui.screenshotPlaceholder(n))"
    >
      <template v-if="!showImage">
        <span class="shot__icon" aria-hidden="true">📱</span>
        <span>{{ ui.screenshotPlaceholder(n) }}</span>
      </template>
    </div>
    <img
      v-if="showImage"
      class="shot__img"
      :class="{ 'is-loaded': loaded }"
      :src="src"
      :alt="shot!.alt"
      :width="size?.[0]"
      :height="size?.[1]"
      loading="lazy"
      decoding="async"
      @load="loaded = true"
      @error="failed = true"
    />
  </figure>
</template>

<style scoped>
.shot {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  border-radius: 18px;
  background: #1a1d24;
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.12),
    0 20px 40px -18px rgb(0 0 0 / 0.7);
}

.shot--placeholder {
  max-width: 220px;
  aspect-ratio: 9 / 16;
}

.shot__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: repeating-linear-gradient(135deg, rgb(255 255 255 / 0.03) 0 10px, transparent 10px 20px);
  color: rgb(237 233 254 / 0.6);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.shot--placeholder .shot__placeholder {
  inset: 10px;
  border: 1.5px dashed rgb(255 255 255 / 0.22);
  border-radius: 12px;
}

.shot__icon {
  font-size: 30px;
  opacity: 0.8;
}

.shot__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.shot__img.is-loaded {
  opacity: 1;
}
</style>
