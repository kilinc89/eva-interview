<template>
  <div class="chart-container">
    <h3>Daily Sales</h3>
    <div v-if="!chartData.length" class="loading">
      Loading chart data...
    </div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>

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
    watch(() => props.chartData, (newData) => {
      console.log('Chart data updated:', newData)
    }, { immediate: true })

    const formattedDates = computed(() => {
      return props.chartData.map(item => new Date(item.date).toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric' 
      }));
    });

    const chartOptions = computed(() => ({
      chart: {
        type: 'column',
        backgroundColor: 'white'
      },
      title: {
        text: 'Daily Sales',
        align: 'left'
      },
      xAxis: {
        categories: formattedDates.value,
        labels: {
          rotation: -45
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount ($)'
        },
        stackLabels: {
          enabled: true
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: ${point.y}<br/>Total: ${point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            format: '${y}'
          }
        }
      },
      series: [
        {
          name: 'Profit',
          data: props.chartData.map(item => item.profit || 0),
          color: '#00C49F'
        },
        {
          name: 'FBA Sales',
          data: props.chartData.map(item => item.fbaAmount || 0),
          color: '#8884d8'
        },
        {
          name: 'FBM Sales',
          data: props.chartData.map(item => item.fbmAmount || 0),
          color: '#483D8B'
        }
      ],
      legend: {
        enabled: true, // Keep legend visible
        align: 'center', // Align in the center
        verticalAlign: 'bottom', // Move it to the bottom
        layout: 'horizontal' // Keep it in a single row
    },

    }));

    return {
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
  background-color: #00C49F;
}

.color-box.fba {
  background-color: #8884d8;
}

.color-box.fbm {
  background-color: #483D8B;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}
</style>
