import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Activity {
  id: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  timestamp: number
}

export interface ChartDataPoint {
  time: string
  cpu: number
  traffic: number
  sessions: number
  requests: number
}

export const useDashboardStore = defineStore('dashboard', () => {
  const isStreaming = ref(true)
  const selectedTimeRange = ref<60 | 300 | 3600>(300)
  const currentMetrics = ref({
    cpu: 78,
    traffic: 1.24,
    sessions: 8420,
    requests: 1247
  })

  const globalEvents = ref({
    nigeria: 1240,
    usa: 4820,
    uk: 2110,
    saudi: 980,
    germany: 1550
  })

  const activities = ref<Activity[]>([
    { id: '1', message: '🚀 System initialized — Real-time streaming active', type: 'info', timestamp: Date.now() },
    { id: '2', message: '📡 WebSocket connection established', type: 'success', timestamp: Date.now() }
  ])

  const chartData = ref<ChartDataPoint[]>([])
  let dataInterval: number | null = null

  const getMaxPoints = () => {
    return selectedTimeRange.value === 60 ? 12 : selectedTimeRange.value === 300 ? 60 : 120
  }

  const trimChartData = () => {
    const maxPoints = getMaxPoints()
    while (chartData.value.length > maxPoints) chartData.value.shift()
  }

  const generateDataPoint = () => {
    if (!isStreaming.value) return

    currentMetrics.value.cpu = Math.min(100, Math.max(15, currentMetrics.value.cpu + (Math.random() - 0.5) * 6))
    currentMetrics.value.traffic = Math.max(0.3, currentMetrics.value.traffic + (Math.random() - 0.5) * 0.15)
    currentMetrics.value.sessions = Math.max(5000, currentMetrics.value.sessions + (Math.random() - 0.5) * 45)
    currentMetrics.value.requests = Math.max(600, currentMetrics.value.requests + (Math.random() - 0.5) * 80)

    globalEvents.value.nigeria += Math.floor((Math.random() - 0.5) * 60)
    globalEvents.value.usa += Math.floor((Math.random() - 0.5) * 180)
    globalEvents.value.uk += Math.floor((Math.random() - 0.5) * 70)
    globalEvents.value.saudi += Math.floor((Math.random() - 0.5) * 40)
    globalEvents.value.germany += Math.floor((Math.random() - 0.5) * 55)

    Object.keys(globalEvents.value).forEach(key => {
      if (globalEvents.value[key as keyof typeof globalEvents.value] < 200) {
        globalEvents.value[key as keyof typeof globalEvents.value] = 200
      }
    })

    const now = new Date()
    const timeLabel = now.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })
    chartData.value.push({
      time: timeLabel,
      cpu: currentMetrics.value.cpu,
      traffic: currentMetrics.value.traffic,
      sessions: currentMetrics.value.sessions,
      requests: currentMetrics.value.requests
    })
    trimChartData()

    const activitiesList = [
      { msg: '⚡ CPU spike detected — throttle engaged', type: 'warning' as const },
      { msg: '🌐 High bandwidth usage on EU cluster', type: 'info' as const },
      { msg: '✅ User analytics pipeline synced', type: 'success' as const },
      { msg: '🔄 Real-time sync completed across 12 nodes', type: 'success' as const },
      { msg: '📈 Record peak traffic: +32% this minute', type: 'info' as const },
      { msg: '🔔 New device connected from Tokyo', type: 'info' as const },
      { msg: '⚠️ Memory usage threshold at 89%', type: 'warning' as const },
      { msg: '🔥 Active sessions hit new record', type: 'success' as const }
    ]

    if (Math.random() < 0.35) {
      const rand = activitiesList[Math.floor(Math.random() * activitiesList.length)]
      addActivity(rand.msg, rand.type)
    }

    if (Math.random() < 0.08 && currentMetrics.value.cpu > 85) {
      addActivity('🚨 CRITICAL: CPU overload detected! Auto-scaling initiated', 'error')
    }
  }

  const addActivity = (message: string, type: Activity['type']) => {
    activities.value.unshift({
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now()
    })
    if (activities.value.length > 20) activities.value.pop()
  }

  const startStreaming = () => {
    if (dataInterval) clearInterval(dataInterval)
    dataInterval = window.setInterval(() => {
      generateDataPoint()
    }, 1500)
  }

  const stopStreaming = () => {
    if (dataInterval) {
      clearInterval(dataInterval)
      dataInterval = null
    }
  }

  const toggleStreaming = () => {
    isStreaming.value = !isStreaming.value
    if (isStreaming.value) {
      startStreaming()
    } else {
      stopStreaming()
    }
  }

  const setTimeRange = (range: 60 | 300 | 3600) => {
    selectedTimeRange.value = range
    trimChartData()
  }

  const clearData = () => {
    chartData.value = []
    activities.value = [{
      id: Date.now().toString(),
      message: 'Dashboard data cleared',
      type: 'info',
      timestamp: Date.now()
    }]
  }

  startStreaming()

  return {
    isStreaming,
    selectedTimeRange,
    currentMetrics,
    globalEvents,
    activities,
    chartData,
    addActivity,
    toggleStreaming,
    setTimeRange,
    clearData
  }
})
