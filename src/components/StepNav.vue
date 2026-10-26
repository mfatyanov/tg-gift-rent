<script setup lang="ts">
import { ui, type Step } from '../content'
import { scrollToStep } from '../lib/scroll'

defineProps<{ steps: Step[]; active: number; visible: boolean }>()
</script>

<template>
  <nav class="nav glass" :class="{ 'is-visible': visible }" :aria-label="ui.navLabel" :inert="!visible">
    <p class="nav__label">
      <span class="nav__word">{{ ui.step }}&nbsp;</span><span class="grad-text">{{ active }}</span><span class="nav__of">&nbsp;{{ ui.of }} {{ steps.length }}</span>
    </p>
    <ul class="nav__dots">
      <li v-for="s in steps" :key="s.n">
        <button
          type="button"
          class="nav__btn"
          :class="{ 'is-active': s.n === active, 'is-done': s.n < active }"
          :aria-label="ui.goToStep(s.n)"
          :aria-current="s.n === active ? 'step' : undefined"
          :data-title="s.title"
          @click="scrollToStep(s.n)"
        >
          <span class="nav__dot" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Мобильный: плавающая плашка снизу */
.nav {
  position: fixed;
  left: 50%;
  bottom: calc(14px + env(safe-area-inset-bottom));
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 18px;
  border-radius: 999px;
  background: var(--glass-strong);
  box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.6);
  opacity: 0;
  transform: translate(-50%, 24px);
  transition:
    opacity 0.35s var(--ease-out),
    transform 0.35s var(--ease-out);
  pointer-events: none;
}

.nav.is-visible {
  opacity: 1;
  transform: translate(-50%, 0);
  pointer-events: auto;
}

.nav__label {
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}

.nav__label .grad-text {
  font-family: var(--font-head);
}

.nav__of {
  color: var(--text-muted);
}

.nav__dots {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav__btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 36px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.nav__dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  opacity: 0.45;
  transition:
    transform 0.3s var(--ease-out),
    opacity 0.3s;
}

.nav__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--violet), var(--pink));
  opacity: 0;
  transition: opacity 0.3s;
}

.is-done .nav__dot {
  opacity: 0.85;
}

.is-active .nav__dot {
  opacity: 1;
  transform: scale(1.6);
}

.is-active .nav__dot::after {
  opacity: 1;
}

/* Десктоп: вертикальные точки сбоку */
@media (min-width: 900px) {
  .nav {
    left: auto;
    right: 24px;
    top: 50%;
    bottom: auto;
    flex-direction: column;
    gap: 4px;
    padding: 14px 6px 8px;
    transform: translate(16px, -50%);
  }

  .nav.is-visible {
    transform: translate(0, -50%);
  }

  .nav__word,
  .nav__of {
    display: none;
  }

  .nav__label {
    font-size: 16px;
  }

  .nav__dots {
    flex-direction: column;
  }

  .nav__btn {
    width: 36px;
    height: 30px;
  }

  /* подпись шага при наведении */
  .nav__btn::before {
    content: attr(data-title);
    position: absolute;
    right: calc(100% + 10px);
    padding: 6px 12px;
    border-radius: 10px;
    background: var(--glass-fallback);
    color: var(--text);
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    transform: translateX(6px);
    transition:
      opacity 0.2s,
      transform 0.2s;
    pointer-events: none;
  }

  .nav__btn:hover::before,
  .nav__btn:focus-visible::before {
    opacity: 1;
    transform: none;
  }
}
</style>
