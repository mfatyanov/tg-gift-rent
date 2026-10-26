import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// Текущий шаг — тот, который пересекает линию чуть выше середины экрана.
const CENTER_LINE = '-40% 0px -55% 0px'

export function useActiveStep(root: Readonly<Ref<HTMLElement | null>>) {
  const active = ref(1)
  const visible = ref(false)
  let stepObserver: IntersectionObserver | undefined
  let rootObserver: IntersectionObserver | undefined

  onMounted(() => {
    if (!root.value) return

    stepObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.step)
        }
      },
      { rootMargin: CENTER_LINE },
    )
    root.value.querySelectorAll('[data-step]').forEach((el) => stepObserver!.observe(el))

    rootObserver = new IntersectionObserver(([e]) => (visible.value = !!e?.isIntersecting), {
      rootMargin: CENTER_LINE,
    })
    rootObserver.observe(root.value)
  })

  onBeforeUnmount(() => {
    stepObserver?.disconnect()
    rootObserver?.disconnect()
  })

  return { active, visible }
}
