<script setup lang="ts">
import RichText from './RichText.vue'
import { warnings } from '../content'
import { vReveal } from '../composables/vReveal'

// чередуем наклон стикеров: -1.5° / +1.2° / -0.8° …
const TILTS = ['-1.5deg', '1.2deg', '-0.8deg', '1.6deg']
</script>

<template>
  <section class="section container" aria-labelledby="warnings-title">
    <h2 id="warnings-title" v-reveal class="section-title">
      <span aria-hidden="true">{{ warnings.emoji }}</span>{{ warnings.title }}
    </h2>

    <ul class="warnings">
      <li v-for="(item, i) in warnings.items" :key="item.title" v-reveal>
        <div
          class="sticker"
          :class="{ 'sticker--danger': item.tone === 'danger' }"
          :style="{ '--tilt': TILTS[i % TILTS.length] }"
        >
          <h3 class="warning__title">
            <span class="warning__emoji" aria-hidden="true">{{ item.emoji }}</span>{{ item.title }}
          </h3>
          <p class="warning__text"><RichText :text="item.text" /></p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.warnings {
  display: grid;
  gap: 26px;
  margin: 30px 0 0;
  padding: 0 4px;
  list-style: none;
}

.warning__title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--warn-title);
  font-size: 17px;
  line-height: 1.3;
}

.sticker--danger .warning__title {
  color: var(--danger-title);
  font-size: 19px;
}

.warning__emoji {
  font-size: 24px;
}

.warning__text {
  margin-top: 8px;
  font-size: 16px;
}
</style>
