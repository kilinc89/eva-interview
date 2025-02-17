<template>
  <div class="chart-container">
    <h3>Daily Sales</h3>
    <div class="chart">
      <div v-for="item in chartData" :key="item.date" class="bar-group">
        <div class="bar-stack">
          <div 
            class="bar profit" 
            :style="{ height: `${(item.profit / maxValue) * 100}%` }"
            :title="`Profit: $${item.profit}`"
          ></div>
          <div 
            class="bar fba" 
            :style="{ height: `${(item.amount / maxValue) * 100}%` }"
            :title="`FBA Sales: $${item.amount}`"
          ></div>
        </div>
        <div class="date">{{ formatDate(item.date) }}</div>
        <div class="amount">${{ formatNumber(item.amount) }}</div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ChartItem } from '../store/chart/types'

export default defineComponent({
  props: {
    chartData: {
      type: Array as () => ChartItem[],
      required: true
    }
  },

  setup(props) {
    const maxValue = computed(() => {
      return Math.max(...props.chartData.map(item => Math.max(item.amount, item.profit)))
    })

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }

    const formatNumber = (num: number) => {
      return num.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }

    return {
      maxValue,
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
}

.chart {
  display: flex;
  align-items: flex-end;
  height: 300px;
  gap: 10px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-stack {
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column-reverse;
}

.bar {
  width: 100%;
  transition: height 0.3s ease;
}

.profit {
  background-color: #4caf50;
  margin-bottom: 2px;
}

.fba {
  background-color: #2196f3;
}

.date {
  font-size: 12px;
  margin-top: 8px;
  transform: rotate(-45deg);
}

.amount {
  font-size: 12px;
  color: #666;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
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
</style>
  