<template>
    <div class="dashboard">
      <p>Store ID: {{ storeId }}</p>
      <p>Marketplace: {{ marketplaceName }}</p>
      <div class="header">
        <h2>Dashboard</h2>
        <select v-model="daySelection" @change="onDayChange" class="day-select">
          <option value="60">Last 60 days</option>
          <option value="30">Last 30 days</option>
          <option value="14">Last 14 days</option>
          <option value="7">Last 7 days</option>
        </select>
      </div>
      
      <!-- Kullanıcı bilgisi -->
  
      
      <!-- Grafiği ayrı bir bileşene alalım -->
      <DailySalesChart :chartData="chartData" />
      <SalesTable :selectedDates="selectedDates" />
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import DailySalesChart from '../components/DailySalesChart.vue'
  import SalesTable from '../components/SalesTable.vue'
  
  export default defineComponent({
    components: { DailySalesChart, SalesTable },

    setup() {
      const store = useStore()
      const daySelection = ref(30)

      const storeId = computed(() => store.state.user.storeId)
      const marketplaceName = computed(() => store.state.user.marketplaceName)
      const chartData = computed(() => store.state.chart.chartData)
      const selectedDates = computed(() => store.state.table.selectedDates)

      const onDayChange = () => {
        store.dispatch('chart/fetchDailySalesOverview', Number(daySelection.value))
      }

      onMounted(async () => {
        try {
          await store.dispatch('user/fetchUserInfo')
          await store.dispatch('chart/fetchDailySalesOverview', Number(daySelection.value))
        } catch (error) {
          console.error('Dashboard mount error:', error)
        }
      })

      return {
        daySelection,
        storeId,
        marketplaceName,
        chartData,
        selectedDates,
        onDayChange
      }
    }
  })
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .day-select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    min-width: 150px;
  }

  h2 {
    margin: 0;
    color: #333;
  }

  p {
    margin: 10px 0;
    font-size: 16px;
  }
  </style>
  