<script setup lang="ts">
import RichText from './RichText.vue'
import { beforeStart } from '../content'
import { vReveal } from '../composables/vReveal'
</script>

<template>
  <section class="section container" aria-labelledby="before-title">
    <h2 id="before-title" v-reveal class="section-title">
      <span aria-hidden="true">{{ beforeStart.emoji }}</span>{{ beforeStart.title }}
    </h2>
    <p v-reveal class="section-lead">{{ beforeStart.lead }}</p>

    <ul class="rules">
      <li v-for="item in beforeStart.items" :key="item.title" v-reveal>
        <div class="rule glass glass--interactive">
          <span class="rule__emoji" aria-hidden="true">{{ item.emoji }}</span>
          <div>
            <h3 class="rule__title">{{ item.title }}</h3>
            <p class="rule__text"><RichText :text="item.text" /></p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.rules {
  display: grid;
  gap: 14px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.rule {
  display: flex;
  gap: 14px;
  padding: 18px;
}

.rule__emoji {
  display: grid;
  flex: none;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: var(--glass-strong);
  font-size: 26px;
}

.rule__title {
  font-size: 17px;
  line-height: 1.3;
}

.rule__text {
  margin-top: 6px;
  color: var(--text-muted);
  font-size: 16px;
}
</style>
