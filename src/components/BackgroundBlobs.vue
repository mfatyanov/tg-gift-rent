<template>
  <div class="blobs" aria-hidden="true">
    <div class="blob blob--violet" />
    <div class="blob blob--pink" />
    <div class="blob blob--cyan" />
  </div>
</template>

<style scoped>
.blobs {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Мягкий radial-gradient вместо filter: blur(120px): выглядит так же, но не грузит GPU
   на слабых телефонах. Анимируется только transform. */
.blob {
  position: absolute;
  width: 75vmax;
  height: 75vmax;
  border-radius: 50%;
  opacity: var(--blob-opacity);
  will-change: transform;
}

.blob--violet {
  top: -28vmax;
  left: -30vmax;
  background: radial-gradient(closest-side, rgb(124 58 237 / 0.9), rgb(124 58 237 / 0.35) 50%, transparent);
  animation: blob-a 26s ease-in-out infinite alternate;
}

.blob--pink {
  top: 20vh;
  right: -38vmax;
  background: radial-gradient(closest-side, rgb(236 72 153 / 0.75), rgb(236 72 153 / 0.28) 50%, transparent);
  animation: blob-b 30s ease-in-out infinite alternate;
}

.blob--cyan {
  bottom: -40vmax;
  left: -10vmax;
  background: radial-gradient(closest-side, rgb(34 211 238 / 0.6), rgb(34 211 238 / 0.22) 50%, transparent);
  animation: blob-c 22s ease-in-out infinite alternate;
}

@keyframes blob-a {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(10vw, 8vh, 0) scale(1.15); }
  100% { transform: translate3d(4vw, 18vh, 0) scale(0.92); }
}

@keyframes blob-b {
  0% { transform: translate3d(0, 0, 0) scale(1.05); }
  50% { transform: translate3d(-14vw, -6vh, 0) scale(0.9); }
  100% { transform: translate3d(-6vw, 14vh, 0) scale(1.18); }
}

@keyframes blob-c {
  0% { transform: translate3d(0, 0, 0) scale(0.95); }
  50% { transform: translate3d(16vw, -10vh, 0) scale(1.12); }
  100% { transform: translate3d(28vw, -4vh, 0) scale(1); }
}
</style>
