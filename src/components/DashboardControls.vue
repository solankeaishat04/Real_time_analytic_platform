<template>
  <div class="controls-panel">
    <div class="controls-header">
      <span>⚙️</span> DASHBOARD CONTROLS
    </div>

    <div class="controls-actions">
      <button
        type="button"
        class="primary"
        @click="store.toggleStreaming"
      >
        {{ store.isStreaming ? 'Pause Streaming' : 'Resume Streaming' }}
      </button>
      <button
        type="button"
        class="secondary"
        @click="store.clearData"
      >
        Clear Data
      </button>
    </div>

    <div class="controls-group">
      <div class="group-label">Time range</div>
      <div class="range-buttons">
        <button
          type="button"
          :class="{ active: store.selectedTimeRange === 60 }"
          @click="store.setTimeRange(60)">Last 1 min</button>
        <button
          type="button"
          :class="{ active: store.selectedTimeRange === 300 }"
          @click="store.setTimeRange(300)">Last 5 mins</button>
        <button
          type="button"
          :class="{ active: store.selectedTimeRange === 3600 }"
          @click="store.setTimeRange(3600)">Last 1 hour</button>
      </div>
    </div>

    <div class="status-row">
      <div class="status-item">
        <span class="status-dot" :class="store.isStreaming ? 'online' : 'offline'"></span>
        {{ store.isStreaming ? 'Streaming active' : 'Streaming paused' }}
      </div>
      <div class="status-item">
        Data retention: {{ store.selectedTimeRange === 60 ? '1 min' : store.selectedTimeRange === 300 ? '5 mins' : '1 hour' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '../stores/dashboardStore'

const store = useDashboardStore()
</script>

<style scoped>
.controls-panel {
  background: rgba(10, 10, 30, 0.65);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 255, 255, 0.18);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 32px;
}

.controls-header {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #f5f7ff;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.controls-actions,
.range-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}

button {
  border: none;
  cursor: pointer;
  border-radius: 14px;
  padding: 12px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

.primary {
  background: linear-gradient(135deg, #00ffff, #5b88ff);
  color: #05101f;
  box-shadow: 0 12px 30px rgba(0, 255, 255, 0.18);
}

.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #f5f7ff;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

button.active {
  background: #00ffff;
  color: #05101f;
}

.controls-group {
  margin-bottom: 18px;
}

.group-label {
  color: #9fb2d2;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #dfe6ff;
  font-size: 0.9rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.online { background: #00ff88; }
.status-dot.offline { background: #ff6b6b; }
</style>
