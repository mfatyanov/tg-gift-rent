<script setup lang="ts">
import StepShot from './StepShot.vue'
import RichText from './RichText.vue'
import { ui, type Step } from '../content'
import { vReveal } from '../composables/vReveal'

defineProps<{ step: Step; total: number }>()
</script>

<template>
  <article :id="`step-${step.n}`" class="step" :data-step="step.n" :aria-labelledby="`step-${step.n}-title`">
    <div v-if="step.warning" v-reveal class="step__warning">
      <p class="sticker">
        <span aria-hidden="true">⚠️</span> <RichText :text="step.warning" />
      </p>
    </div>

    <div v-reveal>
      <div class="step__card glass glass--interactive">
        <div class="step__head">
          <span class="step__num" aria-hidden="true">{{ step.n }}</span>
          <div>
            <p class="step__label">{{ ui.step }} {{ step.n }} {{ ui.of }} {{ total }}</p>
            <h3 :id="`step-${step.n}-title`" class="step__title">
              <span aria-hidden="true">{{ step.emoji }}</span> <RichText :text="step.title" />
            </h3>
          </div>
        </div>

        <div class="step__text">
          <p v-for="(line, i) in step.text" :key="i"><RichText :text="line" /></p>
          <p v-if="step.tip" class="step__tip"><RichText :text="step.tip" /></p>
        </div>

        <div class="step__shots" :class="{ 'step__shots--pair': step.shots.length > 1 }">
          <StepShot v-for="shot in step.shots" :key="shot.file" :n="step.n" :shot="shot" />
          <StepShot v-if="!step.shots.length" :n="step.n" />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.step {
  scroll-margin-top: 20px;
}

.step__warning {
  margin-bottom: 22px;
  padding-inline: 4px;
}

.step__warning .sticker {
  --tilt: 1.2deg;
  font-size: 16px;
  font-weight: 600;
}

/* Заголовок → текст → скриншоты */
.step__card {
  display: grid;
  grid-template-areas:
    'head'
    'text'
    'shot';
  gap: 14px 28px;
  padding: 18px 18px 22px;
}

.step__head {
  grid-area: head;
  display: flex;
  align-items: center;
  gap: 14px;
}

.step__num {
  flex: none;
  min-width: 0.7em;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: var(--font-head);
  font-size: 68px;
  font-weight: 800;
  line-height: 0.9;
}

.step__label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.step__title {
  margin-top: 4px;
  font-size: clamp(19px, 5.2vw, 24px);
  line-height: 1.25;
}

.step__text {
  grid-area: text;
  font-size: 17px;
}

.step__shots {
  grid-area: shot;
  display: grid;
  gap: 12px;
  margin-top: 6px;
}

.step__text p + p {
  margin-top: 10px;
}

.step__text .step__tip {
  margin-top: 16px;
  padding: 10px 14px;
  border: 1px dashed var(--warn-border);
  border-radius: 14px;
  background: var(--warn-bg);
}

@media (min-width: 640px) {
  .step__card {
    padding: 26px 28px 28px;
  }

  .step__num {
    font-size: 80px;
  }

  /* две картинки — рядом, одна — по центру */
  .step__shots--pair {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
