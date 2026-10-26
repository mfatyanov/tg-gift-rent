<script setup lang="ts">
import RichText from './RichText.vue'
import { brand, footer } from '../content'
</script>

<template>
  <footer class="footer container">
    <p class="footer__text"><span aria-hidden="true">💬</span> <RichText :text="footer.text" /></p>
    <p class="footer__note">© <RichText :text="brand.label" /> · {{ footer.note }}</p>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 32px 48px;
  border-top: 1px solid var(--hairline);
  text-align: center;
}

.footer__text {
  font-size: 18px;
  font-weight: 600;
}

.footer__note {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 13px;
}
</style>
