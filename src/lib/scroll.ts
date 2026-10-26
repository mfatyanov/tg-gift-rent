import { prefersReducedMotion } from '../composables/useMediaQuery'

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

export const scrollToStep = (n: number) => scrollToId(`step-${n}`)
