<script setup lang="ts">
import { ref } from 'vue'
import RichText from './RichText.vue'
import { faq } from '../content'
import { vReveal } from '../composables/vReveal'

const open = ref<boolean[]>(faq.items.map(() => false))
const toggle = (i: number) => (open.value[i] = !open.value[i])
</script>

<template>
  <section class="section container" aria-labelledby="faq-title">
    <h2 id="faq-title" v-reveal class="section-title">
      <span aria-hidden="true">{{ faq.emoji }}</span>{{ faq.title }}
    </h2>

    <div class="faq">
      <div v-for="(item, i) in faq.items" :key="item.q" v-reveal>
        <div class="faq__item glass glass--interactive" :class="{ 'is-open': open[i] }">
          <h3 class="faq__q">
            <button
              :id="`faq-q-${i}`"
              type="button"
              class="faq__btn"
              :aria-expanded="open[i]"
              :aria-controls="`faq-a-${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>
              <svg class="faq__chevron" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </h3>
          <div :id="`faq-a-${i}`" class="faq__panel" role="region" :aria-labelledby="`faq-q-${i}`">
            <div class="faq__inner">
              <p class="faq__a"><RichText :text="item.a" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  display: grid;
  gap: 12px;
  margin-top: 26px;
}

.faq__item {
  border-radius: 20px;
}

.faq__q {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0;
}

.faq__btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding: 18px 20px;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.faq__chevron {
  flex: none;
  color: var(--text-muted);
  transition: transform 0.35s var(--ease-out);
}

.is-open .faq__chevron {
  color: var(--pink);
  transform: rotate(180deg);
}

/* плавное раскрытие: height через grid-template-rows 0fr → 1fr + opacity */
.faq__panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
  transition:
    grid-template-rows 0.35s var(--ease-out),
    opacity 0.25s ease,
    visibility 0s linear 0.35s;
}

.is-open .faq__panel {
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
  transition:
    grid-template-rows 0.35s var(--ease-out),
    opacity 0.3s ease 0.05s,
    visibility 0s;
}

.faq__inner {
  min-height: 0;
  overflow: hidden;
}

.faq__a {
  padding: 0 20px 18px;
  color: var(--text-muted);
  font-size: 16px;
}

@media (prefers-reduced-motion: reduce) {
  .faq__panel,
  .is-open .faq__panel {
    transition: opacity 0.2s ease !important;
  }
}
</style>
