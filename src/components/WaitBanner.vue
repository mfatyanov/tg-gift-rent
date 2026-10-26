<script setup lang="ts">
import RichText from './RichText.vue'
import { waiting } from '../content'
import { vReveal } from '../composables/vReveal'
</script>

<template>
  <div v-reveal>
    <aside class="wait glass">
      <span class="wait__icon" aria-hidden="true">{{ waiting.emoji }}</span>
      <div>
        <p class="wait__title">
          {{ waiting.title }}
          <span class="wait__dots" aria-hidden="true"><i /><i /><i /></span>
        </p>
        <p class="wait__text"><RichText :text="waiting.text" /></p>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.wait {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 999px;
  background: linear-gradient(120deg, rgb(34 211 238 / 0.14), rgb(124 58 237 / 0.12));
}

@media (max-width: 480px) {
  .wait {
    border-radius: var(--radius);
  }
}

.wait__icon {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgb(34 211 238 / 0.18);
  font-size: 28px;
}

/* пульсирующее кольцо */
.wait__icon::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--cyan);
  border-radius: 50%;
  animation: wait-pulse 2s ease-out infinite;
}

@keyframes wait-pulse {
  from { transform: scale(0.9); opacity: 0.9; }
  to { transform: scale(1.6); opacity: 0; }
}

.wait__title {
  font-family: var(--font-head);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
}

.wait__text {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 15px;
}

.wait__dots {
  display: inline-flex;
  gap: 4px;
  margin-left: 4px;
  vertical-align: middle;
}

.wait__dots i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  animation: wait-dot 1.2s ease-in-out infinite;
}

.wait__dots i:nth-child(2) { animation-delay: 0.15s; }
.wait__dots i:nth-child(3) { animation-delay: 0.3s; }

@keyframes wait-dot {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-6px); opacity: 1; }
}
</style>
