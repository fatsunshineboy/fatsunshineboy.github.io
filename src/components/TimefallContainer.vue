<template>
  <div class="timefall-container" v-if="enabled">
    <div
      v-for="i in particleCount"
      :key="i"
      class="timefall-drop"
      :style="{
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 2.5 + 's',
        animationDuration: (2 + Math.random()) + 's'
      }"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  enabled: {
    type: Boolean,
    default: true
  },
  particleCount: {
    type: Number,
    default: 80
  }
})
</script>

<style scoped>
.timefall-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--z-base);
  overflow: hidden;
}

.timefall-drop {
  position: absolute;
  width: 2px;
  height: 25px;
  background: linear-gradient(180deg, transparent, rgba(100, 149, 237, 0.25), transparent);
  animation: timefall-fall linear infinite;
}

@keyframes timefall-fall {
  0% {
    transform: translateY(-50px) scaleY(0.3);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) scaleY(1);
    opacity: 0;
  }
}
</style>
