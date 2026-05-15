<!-- components/Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="header">
      <h1>⚡ MUHAMMAD ALMUKHTAR — REAL-TIME ANALYTICS PLATFORM ⚡</h1>
      <div class="header-sub">Vue.js • TypeScript • Live Streaming Dashboard • Animated UI</div>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.id"
        :metric="metric"
      />
    </div>

    <!-- Charts Row -->
    <div class="content-row">
      <RealTimeLineChart />
      <GlobalDataStream />
    </div>

    <!-- Activity Feed -->
    <ActivityFeed />

    <!-- Controls -->
    <DashboardControls />
    
    <div class="footer">
      🌙 Dark Mode • Responsive • Animated UI • Real-time Analytics Engine — Muhammad Almukhtar © 2026
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import MetricCard from './MetricCard.vue'
import RealTimeLineChart from './RealTimeLineChart.vue'
import GlobalDataStream from './GlobalDataStream.vue'
import ActivityFeed from './ActivityFeed.vue'
import DashboardControls from './DashboardControls.vue'

const store = useDashboardStore()

const metrics = computed(() => [
  {
    id: 'cpu',
    icon: '⚡',
    title: 'CPU USAGE',
    value: store.currentMetrics.cpu,
    unit: '%',
    trend: '+2.3%',
    trendUp: true,
    description: 'vs last minute'
  },
  {
    id: 'traffic',
    icon: '🌐',
    title: 'NETWORK TRAFFIC',
    value: store.currentMetrics.traffic,
    unit: 'GB/s',
    trend: '+0.8%',
    trendUp: true,
    description: 'vs last minute'
  },
  {
    id: 'sessions',
    icon: '🔥',
    title: 'ACTIVE SESSIONS',
    value: store.currentMetrics.sessions,
    unit: '',
    trend: '+124',
    trendUp: true,
    description: 'new users'
  },
  {
    id: 'requests',
    icon: '📊',
    title: 'REQUESTS/SEC',
    value: store.currentMetrics.requests,
    unit: '',
    trend: '+5.2%',
    trendUp: true,
    description: 'peak hour'
  }
])
</script>

<style scoped>
.dashboard-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background: rgba(10, 10, 30, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 32px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: titlePulse 3s ease infinite;
  letter-spacing: 2px;
}

@keyframes titlePulse {
  0%, 100% { opacity: 1; text-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
  50% { opacity: 0.95; text-shadow: 0 0 40px rgba(255, 0, 255, 0.5); }
}

.header-sub {
  font-size: 0.9rem;
  color: #8888aa;
  margin-top: 8px;
  letter-spacing: 1px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.content-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.footer {
  text-align: center;
  padding: 20px;
  margin-top: 30px;
  font-size: 0.8rem;
  color: #666;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 900px) {
  .content-row {
    grid-template-columns: 1fr;
  }
  .header h1 {
    font-size: 1.4rem;
  }
  .dashboard-container {
    padding: 12px;
  }
}
</style>