<script setup lang="ts">
import { ref } from 'vue'
import { ui } from '../content'

// Скриншот в рамке «экран телефона». Пока файла нет — аккуратный плейсхолдер.
const props = defineProps<{ n: number; alt: string }>()

const src = `${import.meta.env.BASE_URL}steps/step-${props.n}.png`
const loaded = ref(false)
const failed = ref(false)
</script>

<template>
  <figure class="phone">
    <div class="phone__screen">
      <div
        v-if="!loaded"
        class="phone__placeholder"
        :role="failed ? 'img' : undefined"
        :aria-label="failed ? alt : undefined"
      >
        <span class="phone__icon" aria-hidden="true">📱</span>
        <span>{{ ui.screenshotPlaceholder(n) }}</span>
      </div>
      <img
        v-if="!failed"
        class="phone__img"
        :class="{ 'is-loaded': loaded }"
        :src="src"
        :alt="alt"
        width="1080"
        height="1920"
        loading="lazy"
        decoding="async"
        @load="loaded = true"
        @error="failed = true"
      />
    </div>
  </figure>
</template>

<style scoped>
.phone {
  width: min(220px, 68%);
  margin: 0 auto;
}

.phone__screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 9 / 16;
  border: 6px solid var(--phone-frame);
  border-radius: 28px;
  background: #120d26;
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.1),
    0 24px 44px -18px rgb(0 0 0 / 0.7);
}

/* «вырез» камеры */
.phone__screen::before {
  content: '';
  position: absolute;
  top: 7px;
  left: 50%;
  z-index: 2;
  width: 54px;
  height: 14px;
  margin-left: -27px;
  border-radius: 999px;
  background: var(--phone-frame);
}

.phone__placeholder {
  position: absolute;
  inset: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1.5px dashed rgb(255 255 255 / 0.22);
  border-radius: 18px;
  background: repeating-linear-gradient(
    135deg,
    rgb(255 255 255 / 0.03) 0 10px,
    transparent 10px 20px
  );
  color: rgb(237 233 254 / 0.6);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.phone__icon {
  font-size: 30px;
  opacity: 0.8;
}

.phone__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.phone__img.is-loaded {
  opacity: 1;
}
</style>
