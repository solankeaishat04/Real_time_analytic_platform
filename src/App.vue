<!-- App.vue -->
<template>
  <div class="app">
    <AnimatedBackground />
    <FloatingParticles />
    <Dashboard />
  </div>
</template>

<script setup lang="ts">
import Dashboard from './components/Dashboard.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import FloatingParticles from './components/FloatingParticles.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Segoe UI', 'Poppins', system-ui, -apple-system, sans-serif;
  background: #0a0a0a;
  overflow-x: hidden;
  color: #ffffff;
}

.app {
  min-height: 100vh;
  position: relative;
}
</style>