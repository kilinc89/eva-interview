<template>
    <div>
      <highcharts :options="chartOptions" @render="onChartRender" />
    </div>
  </template>
  
  <script>
  import Highcharts from 'highcharts'
  import HighchartsVue from 'highcharts-vue'
  import { mapActions } from 'vuex'
  
  // Kurulumda: app.use(HighchartsVue)
  export default {
    name: 'DailySalesChart',
    props: {
      chartData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'column',
            events: {
              click: (event) => {
                // grafiğe genel tıklama
              }
            }
          },
          title: {
            text: 'Daily Sales Overview'
          },
          xAxis: {
            categories: [] // Gün/ Tarih bilgisi
          },
          yAxis: {
            title: {
              text: 'Sales Amount'
            }
          },
          series: [
            // Örneğin FBA, FBM, Profit serileri
          ],
          tooltip: {
            formatter() {
              // totalSales (fbaAmount + fbmAmount), shipping, profit gibi bilgileri gösterebilirsiniz
              return `Tooltip custom text`
            }
          },
          plotOptions: {
            column: {
              cursor: 'pointer',
              point: {
                events: {
                  click: (e) => {
                    // Tıklanan sütunun tarihi
                    const selectedDate = e.point.category 
                    this.handleColumnClick(selectedDate)
                  }
                }
              }
            }
          }
        }
      }
    },
    mounted() {
      this.generateChartOptions()
    },
    watch: {
      chartData: {
        deep: true,
        handler() {
          this.generateChartOptions()
        }
      }
    },
    methods: {
      ...mapActions('table', ['addOrRemoveDate']),
      generateChartOptions() {
        // chartData içindeki her bir objede date, fbaAmount, fbmAmount, profit vb. olduğunu varsayalım
        const categories = this.chartData.map(item => item.date)
        
        // Örnek: FBA serisi
        const fbaSeries = this.chartData.map(item => item.fbaAmount)
        const fbmSeries = this.chartData.map(item => item.fbmAmount)
        const profitSeries = this.chartData.map(item => item.profit)
        // vb...
  
        this.chartOptions.xAxis.categories = categories
        this.chartOptions.series = [
          { name: 'FBA Sales', data: fbaSeries },
          { name: 'FBM Sales', data: fbmSeries },
          { name: 'Profit', data: profitSeries }
        ]
      },
      handleColumnClick(date) {
        // Vuex aksiyonumuzu çağırarak tabloyu güncelle
        this.addOrRemoveDate(date)
      }
    }
  }
  </script>
  