<script setup lang="ts">
import DecorShape from './DecorShape.vue'
import RichText from './RichText.vue'
import { brand, hero } from '../content'
import { vReveal } from '../composables/vReveal'
import { scrollToStep } from '../lib/scroll'
</script>

<template>
  <header class="hero container">
    <p v-reveal class="hero__brand">{{ brand.name }}</p>

    <div v-reveal class="hero__art" aria-hidden="true">
      <div class="hero__glow" />
      <div class="hero__box"><DecorShape kind="box" :size="112" /></div>
      <span class="hero__spark hero__spark--a">✨</span>
      <span class="hero__spark hero__spark--b">💎</span>
    </div>

    <p v-reveal class="hero__kicker">{{ hero.kicker }}</p>
    <h1 v-reveal class="hero__title"><span class="grad-text">{{ hero.title }}</span></h1>
    <p v-reveal class="hero__subtitle"><RichText :text="hero.subtitle" /></p>

    <ul v-reveal class="hero__badges">
      <li v-for="b in hero.badges" :key="b.text" class="hero__badge">
        <span aria-hidden="true">{{ b.emoji }}</span>{{ b.text }}
      </li>
    </ul>

    <div v-reveal>
      <a class="hero__cta" href="#step-1" @click.prevent="scrollToStep(1)">
        {{ hero.cta }} <span class="hero__arrow" aria-hidden="true">↓</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: min(100svh, 880px);
  padding-block: 56px 40px;
  text-align: center;
}

.hero__brand {
  padding: 6px 14px;
  border: 1px solid var(--hairline);
  border-radius: 999px;
  background: var(--glass);
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.hero__art {
  position: relative;
  width: 150px;
  height: 140px;
  margin-block: 20px 8px;
}

.hero__glow {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(236 72 153 / 0.55), transparent);
}

.hero__box {
  position: absolute;
  left: 19px;
  top: 14px;
  animation: hero-float 5s ease-in-out infinite alternate;
}

.hero__spark {
  position: absolute;
  font-size: 26px;
  animation: hero-float 4s ease-in-out infinite alternate-reverse;
}

.hero__spark--a { top: 0; right: 4px; }
.hero__spark--b { bottom: 8px; left: 0; font-size: 22px; animation-duration: 6s; }

@keyframes hero-float {
  from { transform: translateY(-6px) rotate(-4deg); }
  to { transform: translateY(6px) rotate(4deg); }
}

.hero__kicker {
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero__title {
  margin-top: 12px;
  font-size: clamp(34px, 10vw, 64px);
  line-height: 1.05;
}

.hero__subtitle {
  max-width: 34ch;
  margin-top: 18px;
  font-size: 18px;
  color: var(--text-muted);
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}

.hero__badge {
  display: inline-flex;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--hairline);
  border-radius: 999px;
  background: var(--glass-strong);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  padding: 16px 34px;
  border-radius: 999px;
  background: var(--grad-btn);
  box-shadow: 0 12px 32px -10px rgb(236 72 153 / 0.7);
  color: #fff;
  font-family: var(--font-head);
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.3s var(--ease-out);
}

.hero__cta:hover { transform: translateY(-3px) scale(1.02); }
.hero__cta:active { transform: scale(0.97); }

.hero__arrow {
  display: inline-block;
  animation: arrow-bounce 1.6s ease-in-out infinite;
}

@keyframes arrow-bounce {
  0%, 100% { transform: translateY(-2px); }
  50% { transform: translateY(4px); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__cta:hover,
  .hero__cta:active {
    transform: none;
  }
}
</style>
