import { onBeforeUnmount, onMounted, ref } from 'vue'

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const MOBILE = '(max-width: 720px)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

export function useMediaQuery(query: string) {
  const mql = window.matchMedia(query)
  const matches = ref(mql.matches)
  const onChange = (e: MediaQueryListEvent) => (matches.value = e.matches)

  onMounted(() => mql.addEventListener('change', onChange))
  onBeforeUnmount(() => mql.removeEventListener('change', onChange))
  return matches
}

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION)
