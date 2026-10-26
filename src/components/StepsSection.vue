<script setup lang="ts">
import { useTemplateRef } from 'vue'
import PathConnector from './PathConnector.vue'
import StepCard from './StepCard.vue'
import StepNav from './StepNav.vue'
import WaitBanner from './WaitBanner.vue'
import { stepParts, steps } from '../content'
import { vReveal } from '../composables/vReveal'
import { useActiveStep } from '../composables/useActiveStep'

const root = useTemplateRef('root')
const { active, visible } = useActiveStep(root)

const partSteps = (numbers: number[]) => steps.filter((s) => numbers.includes(s.n))
</script>

<template>
  <div ref="root" class="steps container">
    <template v-for="(part, pi) in stepParts" :key="part.title">
      <template v-if="pi > 0">
        <PathConnector />
        <WaitBanner />
        <PathConnector />
      </template>

      <section class="part" :aria-labelledby="`part-${pi}`">
        <div v-reveal class="part__head">
          <p class="part__kicker">{{ part.kicker }}</p>
          <h2 :id="`part-${pi}`" class="section-title">
            <span aria-hidden="true">{{ part.emoji }}</span>{{ part.title }}
          </h2>
        </div>

        <template v-for="(step, si) in partSteps(part.steps)" :key="step.n">
          <PathConnector v-if="si > 0" />
          <StepCard :step="step" :total="steps.length" />
        </template>
      </section>
    </template>

    <PathConnector />
  </div>

  <StepNav :steps="steps" :active="active" :visible="visible" />
</template>

<style scoped>
.steps {
  padding-top: 24px;
}

.part__head {
  margin-bottom: 22px;
}

.part__kicker {
  margin-bottom: 6px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
