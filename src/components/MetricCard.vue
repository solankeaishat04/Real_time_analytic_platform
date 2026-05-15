<!-- components/MetricCard.vue -->
<template>
  <div class="metric-card">
    <div class="metric-icon">{{ metric.icon }}</div>
    <div class="metric-title">{{ metric.title }}</div>
    <div class="metric-value">
      {{ formattedValue }}<span class="metric-unit">{{ metric.unit }}</span>
    </div>
    <div class="metric-trend">
      <span :class="metric.trendUp ? 'trend-up' : 'trend-down'">
        {{ metric.trendUp ? '↑' : '↓' }} {{ metric.trend }}
      </span>
      {{ metric.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Metric {
  id: string
  icon: string
  title: string
  value: number
  unit: string
  trend: string
  trendUp: boolean
  description: string
}

const props = defineProps<{
  metric: Metric
}>()

const formattedValue = computed(() => {
  if (props.metric.unit === '%') return Math.round(props.metric.value)
  if (props.metric.id === 'traffic') return props.metric.value.toFixed(2)
  return Math.floor(props.metric.value).toLocaleString()
})
</script>

<style scoped>
.metric-card {
  background: rgba(15, 15, 35, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(0, 255, 255, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.metric-card:hover::before {
  left: 100%;
}

.metric-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 10px 40px rgba(0, 255, 255, 0.15);
}

.metric-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.metric-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #8888cc;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #00ffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.metric-unit {
  font-size: 0.9rem;
  color: #6666aa;
  margin-left: 4px;
}

.metric-trend {
  font-size: 0.75rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #888;
}

.trend-up { color: #00ff88; }
.trend-down { color: #ff4444; }
</style>