import type { Directive } from 'vue'

// v-reveal: элемент всплывает (fade + translateY), когда попадает в экран.
// Элементы, появившиеся одновременно, получают задержку по очереди — stagger 80ms.
const STAGGER_MS = 80

let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach((entry, i) => {
          const el = entry.target as HTMLElement
          el.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`)
          el.classList.add('is-revealed')
          observer!.unobserve(el)
        })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal')
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
