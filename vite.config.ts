import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { brand, meta } from './src/content.ts'

// Подставляет название бренда и описание из content.ts в index.html (<title>, og-теги),
// чтобы превью ссылки в чатах показывало правильный текст без JS.
function htmlContent(): Plugin {
  return {
    name: 'html-content',
    transformIndexHtml: (html) =>
      html
        .replaceAll('%BRAND_NAME%', brand.name)
        .replaceAll('%PAGE_TITLE%', meta.title)
        .replaceAll('%PAGE_DESCRIPTION%', meta.description),
  }
}

export default defineConfig({
  // Относительный base: одна и та же сборка работает и на GitHub Pages (/repo/), и на Vercel (/).
  base: './',
  plugins: [vue(), htmlContent()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
})
