<template>
  <div class="chart-container">
    <h3>Daily Sales</h3>
    <div v-if="!chartData.length" class="loading">
      Loading chart data...
    </div>
    <div v-else class="chart">
      <div v-for="item in chartData" :key="item.date" class="bar-group">
        <div class="bar-stack">
          <!-- FBA Sales Bar -->
          <div 
            class="bar fba" 
            :style="{
              height: `${calculateHeight(item.fbaAmount)}%`,
              backgroundColor: '#2196f3'
            }"
          >
            <span class="tooltip">FBA: ${{ formatNumber(item.fbaAmount) }}</span>
          </div>
          <!-- FBM Sales Bar -->
          <div 
            class="bar fbm" 
            :style="{
              height: `${calculateHeight(item.fbmAmount)}%`,
              backgroundColor: '#9c27b0'
            }"
          >
            <span class="tooltip">FBM: ${{ formatNumber(item.fbmAmount) }}</span>
          </div>
          <!-- Profit Bar -->
          <div 
            class="bar profit" 
            :style="{
              height: `${calculateHeight(item.profit)}%`,
              backgroundColor: '#4caf50'
            }"
          >
            <span class="tooltip">Profit: ${{ formatNumber(item.profit) }}</span>
          </div>
        </div>
        <div class="date">{{ formatDate(item.date) }}</div>
      </div>
    </div>
    <div class="legend">
      <div class="legend-item">
        <div class="color-box profit"></div>
        <span>Profit</span>
      </div>
      <div class="legend-item">
        <div class="color-box fba"></div>
        <span>FBA Sales</span>
      </div>
      <div class="legend-item">
        <div class="color-box fbm"></div>
        <span>FBM Sales</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import type { ChartItem } from '../store/chart/types'

export default defineComponent({
  props: {
    chartData: {
      type: Array as () => ChartItem[],
      required: true
    }
  },

  setup(props) {
    // Watch chartData for debugging
    watch(() => props.chartData, (newData) => {
      console.log('Chart data updated:', newData)
    }, { immediate: true })

    const maxValue = computed(() => {
      if (!props.chartData.length) return 0
      return Math.max(...props.chartData.map(item => 
        Math.max(
          item.fbaAmount || 0, 
          item.fbmAmount || 0, 
          item.profit || 0
        )
      ))
    })

    const calculateHeight = (value: number): number => {
      if (!maxValue.value) return 0
      return (value / maxValue.value) * 100
    }

    const formatDate = (dateStr: string) => {
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short', 
          day: 'numeric' 
        })
      } catch (e) {
        return dateStr
      }
    }

    const formatNumber = (num: number) => {
      return num.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }

    return {
      maxValue,
      calculateHeight,
      formatDate,
      formatNumber
    }
  }
})
</script>

<style scoped>
.chart-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.chart {
  display: flex;
  align-items: flex-end;
  height: 300px;
  gap: 8px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
}

.bar-group {
  flex: 0 0 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-stack {
  width: 30px;
  height: 100%;
  position: relative;
}

.bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 0.3s ease;
}

.bar:hover .tooltip {
  display: block;
}

.tooltip {
  display: none;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.date {
  font-size: 11px;
  margin-top: 8px;
  transform: rotate(-45deg);
  white-space: nowrap;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.color-box.profit {
  background-color: #4caf50;
}

.color-box.fba {
  background-color: #2196f3;
}

.color-box.fbm {
  background-color: #9c27b0;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}
</style>
  