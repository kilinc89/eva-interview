<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <div v-if="!chartData.length" class="text-center text-gray-500 py-10">
      Loading chart data...
    </div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ChartItem } from '../store/chart/types'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    chartData: {
      type: Array as () => ChartItem[],
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const formattedDates = computed(() => {
      return props.chartData.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/(\d+)\/(\d+)\/(\d+)/, '$2-$1-$3');
      });
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
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '',
        formatter: function (): string {
          const index = (this as any).points[0].point.index;
          const data = props.chartData[index];

          return `
            <div style="padding: 8px;">
              <b>Total Sales:</b> $${(data.fbaAmount + data.fbmAmount).toFixed(2)}<br/>
              <b>Shipping:</b> $${data.fbaShippingAmount.toFixed(2)}<br/>
              <b>Profit:</b> $${data.profit.toFixed(2)}<br/>
              <b>FBA Sales:</b> $${data.fbaAmount.toFixed(2)}<br/>
              <b>FBM Sales:</b> $${data.fbmAmount.toFixed(2)}
            </div>
          `;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            format: '${y}',
            rotation: -90,
            align: 'center',
            verticalAlign: 'middle',
          },
          cursor: 'pointer',
          point: {
            events: {
              click: function(this: { index: number }) {
                const date = props.chartData[this.index].date
                store.dispatch('table/addOrRemoveDate', date)
              }
            }
          }
        }
      },
      series: [
        {
          name: 'Profit',
          data: props.chartData.map(item => item.profit ?? 0),
          color: '#00C49F'
        },
        {
          name: 'FBA Sales',
          data: props.chartData.map(item => item.fbaAmount ?? 0) 
        },
        {
          name: 'FBM Sales',
          data: props.chartData.map(item => item.fbmAmount ?? 0),
          color: '#4B0082'
        }
      ]
    }));

    return {
      chartOptions
    }
  }
})
</script>

<style scoped>
/* Removed custom styles as Tailwind handles styling */
</style>
