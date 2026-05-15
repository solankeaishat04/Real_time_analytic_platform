<template>
  <div class="global-stream">
    <div class="stream-header">
      <div>
        <span>🌍</span>
        GLOBAL EVENT STREAM
      </div>
      <div class="mode-buttons">
        <button
          type="button"
          :class="{ active: mode === 'bar' }"
          @click="setMode('bar')"
        >Bar View</button>
        <button
          type="button"
          :class="{ active: mode === 'area' }"
          @click="setMode('area')"
        >Area View</button>
      </div>
    </div>

    <div class="stream-summary">
      <div class="summary-card" v-for="(count, country) in store.globalEvents" :key="country">
        <div class="country">{{ country.toUpperCase() }}</div>
        <div class="count">{{ count }}</div>
      </div>
    </div>

    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import Chart from 'chart.js/auto'
import type { Chart as ChartJS, ChartConfiguration } from 'chart.js'

const store = useDashboardStore()
const chartCanvas = ref<HTMLCanvasElement | null>(null)
const chartInstance = ref<ChartJS | null>(null)
const mode = ref<'bar' | 'area'>('bar')

const labels = computed(() => Object.keys(store.globalEvents))
const barData = computed(() => Object.values(store.globalEvents))
const areaLabels = computed(() => store.chartData.map(point => point.time))
const areaData = computed(() => store.chartData.map(point => point.traffic))

const buildConfig = (): ChartConfiguration => {
  const isBar = mode.value === 'bar'
  return {
    type: isBar ? 'bar' : 'line',
    data: {
      labels: isBar ? labels.value : areaLabels.value,
      datasets: [
        {
          label: isBar ? 'Global event volume' : 'Network traffic (GB/s)',
          data: isBar ? barData.value : areaData.value,
          backgroundColor: isBar
            ? [
                'rgba(0, 255, 255, 0.28)',
                'rgba(255, 99, 132, 0.28)',
                'rgba(255, 206, 86, 0.28)',
                'rgba(54, 162, 235, 0.28)',
                'rgba(153, 102, 255, 0.28)'
              ]
            : 'rgba(0, 255, 255, 0.18)',
          borderColor: '#00ffff',
          borderWidth: 2,
          fill: !isBar,
          tension: 0.35,
          pointRadius: isBar ? 5 : 3,
          pointBackgroundColor: '#00ffff'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#ddd', font: { size: 11 } } },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.85)' }
      },
      scales: {
        x: {
          ticks: { color: '#aaa' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: '#00ffff' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  } as ChartConfiguration
}

const initChart = () => {
  if (!chartCanvas.value) return
  chartInstance.value = new Chart(chartCanvas.value, buildConfig())
}

const updateChart = () => {
  if (!chartInstance.value) return
  if (chartInstance.value.config.type !== mode.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
    initChart()
    return
  }

  chartInstance.value.data.labels = mode.value === 'bar' ? labels.value : areaLabels.value
  chartInstance.value.data.datasets[0].data = mode.value === 'bar' ? barData.value : areaData.value
  chartInstance.value.update('none')
}

const setMode = (newMode: 'bar' | 'area') => {
  mode.value = newMode
}

watch(mode, () => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
  }
  initChart()
})

watch(
  () => store.globalEvents,
  () => {
    if (mode.value === 'bar') updateChart()
  },
  { deep: true }
)

watch(
  () => store.chartData,
  () => {
    if (mode.value === 'area') updateChart()
  },
  { deep: true }
)

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>

<style scoped>
.global-stream {
  background: rgba(10, 10, 30, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 20px;
  border: 1px solid rgba(0, 255, 255, 0.15);
  display: grid;
  gap: 22px;
}

.stream-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: #00ffff;
  font-weight: 700;
}

.stream-header span {
  font-size: 1.25rem;
}

.mode-buttons {
  display: flex;
  gap: 10px;
}

.mode-buttons button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  padding: 10px 14px;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.mode-buttons button.active {
  background: #00ffff;
  color: #05101f;
  border-color: #00ffff;
}

.stream-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 12px;
}

.summary-card {
  background: rgba(0, 255, 255, 0.07);
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 18px;
  padding: 14px 16px;
}

.country {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #aaa;
  margin-bottom: 6px;
}

.count {
  font-size: 1.4rem;
  font-weight: 700;
  color: #f5f7ff;
}

.chart-container {
  min-height: 320px;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
