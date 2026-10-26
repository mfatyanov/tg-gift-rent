<script setup lang="ts">
import BackgroundBlobs from './components/BackgroundBlobs.vue'
import BeforeStart from './components/BeforeStart.vue'
import DoneBlock from './components/DoneBlock.vue'
import FaqSection from './components/FaqSection.vue'
import FloatingGifts from './components/FloatingGifts.vue'
import HeroSection from './components/HeroSection.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import SiteFooter from './components/SiteFooter.vue'
import StepsSection from './components/StepsSection.vue'
import WarningsBlock from './components/WarningsBlock.vue'
</script>

<template>
  <BackgroundBlobs />
  <FloatingGifts />
  <ScrollProgress />

  <div class="page">
    <main>
      <HeroSection />
      <BeforeStart />
      <StepsSection />
      <DoneBlock />
      <WarningsBlock />
      <FaqSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  overflow-x: clip;
}
</style>
