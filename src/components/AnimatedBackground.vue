<!-- components/AnimatedBackground.vue -->
<template>
  <div class="animated-bg"></div>
</template>

<style scoped>
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: linear-gradient(125deg, #0a0a2a 0%, #1a0a2e 25%, #0a1a3a 50%, #1a0a2e 75%, #0a0a2a 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>