import { onBeforeUnmount, onMounted } from 'vue'

// Один общий scroll/resize-слушатель на всю страницу: все колбэки выполняются
// в одном requestAnimationFrame, без лишних layout-ов между ними.
type Callback = () => void

const callbacks = new Set<Callback>()
let scheduled = false

function flush() {
  scheduled = false
  callbacks.forEach((cb) => cb())
}

export function requestFrame() {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(flush)
}

/** Вызывает cb при скролле/ресайзе (не чаще раза за кадр). Возвращает функцию ручного перезапуска. */
export function useScrollFrame(cb: Callback) {
  onMounted(() => {
    if (callbacks.size === 0) {
      window.addEventListener('scroll', requestFrame, { passive: true })
      window.addEventListener('resize', requestFrame, { passive: true })
    }
    callbacks.add(cb)
    requestFrame()
  })

  onBeforeUnmount(() => {
    callbacks.delete(cb)
    if (callbacks.size === 0) {
      window.removeEventListener('scroll', requestFrame)
      window.removeEventListener('resize', requestFrame)
    }
  })

  return requestFrame
}
