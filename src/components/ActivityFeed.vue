<!-- components/ActivityFeed.vue -->
<template>
  <div class="activity-feed">
    <div class="feed-header">
      <span>🧠</span> SYSTEM ACTIVITY FEED — LIVE UPDATES
    </div>
    <div class="feed-items">
      <div 
        v-for="activity in store.activities" 
        :key="activity.id" 
        class="feed-item"
      >
        <div class="feed-message">
          <div :class="['feed-dot', activity.type]"></div>
          {{ activity.message }}
        </div>
        <div class="feed-time">{{ formatTime(activity.timestamp) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '../stores/dashboardStore'

const store = useDashboardStore()

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
</script>

<style scoped>
.activity-feed {
  background: rgba(10, 10, 30, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 32px;
  border: 1px solid rgba(0, 255, 255, 0.15);
  max-height: 320px;
  overflow-y: auto;
}

.activity-feed::-webkit-scrollbar {
  width: 5px;
}

.activity-feed::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.activity-feed::-webkit-scrollbar-thumb {
  background: #00ffff;
  border-radius: 10px;
}

.feed-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffff00;
}

.feed-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feed-message {
  display: flex;
  align-items: center;
  gap: 10px;
}

.feed-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.feed-dot.info { background: #00ffff; box-shadow: 0 0 8px #00ffff; }
.feed-dot.warning { background: #ffff00; box-shadow: 0 0 8px #ffff00; }
.feed-dot.error { background: #ff4444; box-shadow: 0 0 8px #ff4444; }
.feed-dot.success { background: #00ff88; box-shadow: 0 0 8px #00ff88; }

.feed-time {
  font-size: 0.7rem;
  color: #666;
  font-family: monospace;
}
</style>