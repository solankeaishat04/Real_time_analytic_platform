<!-- components/RealTimeLineChart.vue -->
<template>
  <div class="chart-container">
    <div class="chart-title">
      <span>📊</span> REAL-TIME LINE CHART — SYSTEM METRICS
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import Chart from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null
const store = useDashboardStore()

const initChart = () => {
  if (!chartCanvas.value) return
  
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'System Load (%)',
        data: [],
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0, 255, 255, 0.05)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { labels: { color: '#aaa', font: { size: 10 } } },
        tooltip: { mode: 'index', intersect: false, backgroundColor: 'rgba(0,0,0,0.8)' }
      },
      scales: {
        x: { ticks: { color: '#888', maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#00ffff' }, grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, text: 'Usage %', color: '#aaa' } }
      }
    }
  })
}

watch(() => store.chartData, (newData) => {
  if (chartInstance) {
    chartInstance.data.labels = newData.map(d => d.time)
    chartInstance.data.datasets[0].data = newData.map(d => d.cpu)
    chartInstance.update('none')
  }
}, { deep: true })

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  background: rgba(10, 10, 30, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 20px;
  border: 1px solid rgba(0, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.chart-container:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 5px 25px rgba(0, 255, 255, 0.1);
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00ffff;
  letter-spacing: 1px;
}

canvas {
  width: 100%;
  height: 280px;
}
</style>