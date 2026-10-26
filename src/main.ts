import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.css'

// iOS Safari включает :active на тач-устройствах только при наличии touch-слушателя
document.addEventListener('touchstart', () => {}, { passive: true })

createApp(App).mount('#app')
