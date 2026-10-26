import { prefersReducedMotion } from '../composables/useMediaQuery'

export function scrollToStep(n: number) {
  document.getElementById(`step-${n}`)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}
