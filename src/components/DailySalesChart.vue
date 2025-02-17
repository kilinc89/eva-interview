<template>
  <div class="chart-container">
    <h3>Daily Sales</h3>
    <div v-if="!chartData.length" class="loading">
      Loading chart data...
    </div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>


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


    const chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
          text: 'Major trophies for some English teams',
          align: 'left'
      },
      xAxis: {
          categories: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Count trophies'
          },
          stackLabels: {
              enabled: true
          }
      },
      legend: {
          align: 'left',
          x: 10,
          verticalAlign: 'top',
          y: 70,
          floating: true,
          backgroundColor:
            'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      tooltip: {
          headerFormat: '<b>{category}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [{
          name: 'BPL',
          data: [3, 5, 1, 13]
      }, {
          name: 'FA Cup',
          data: [14, 8, 8, 12]
      }, {
          name: 'CL',
          data: [0, 2, 6, 3]
      }]
     
      }

    return {
      maxValue,
      calculateHeight,
      formatDate,
      formatNumber,
      chartOptions
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
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
  min-width: 200px;
}

.tooltip-title {
  font-weight: bold;
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
}

.tooltip-row span:first-child {
  margin-right: 12px;
  color: rgba(255, 255, 255, 0.7);
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
  