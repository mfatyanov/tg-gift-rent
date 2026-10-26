<script setup lang="ts">
import { computed } from 'vue'
import { parseRich } from '../lib/richText'

const props = defineProps<{ text: string }>()
const tokens = computed(() => parseRich(props.text))
</script>

<template>
  <template v-for="(t, i) in tokens" :key="i">
    <template v-if="t.type === 'text'">{{ t.value }}</template>
    <strong v-else-if="t.type === 'bold'"><RichText :text="t.value" /></strong>
    <span v-else-if="t.type === 'chip'" class="chip-btn" :class="{ 'chip-btn--danger': t.danger }">
      <span v-if="t.danger" aria-hidden="true">✕</span>{{ t.value }}
    </span>
    <code v-else-if="t.type === 'code'">{{ t.value }}</code>
    <a v-else :href="t.href" target="_blank" rel="noopener noreferrer">{{ t.value }}</a>
  </template>
</template>
