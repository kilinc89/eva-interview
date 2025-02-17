<template>
    <div class="dashboard">
      <h2>Dashboard</h2>
      <!-- Kullanıcı bilgisi -->
      <p>Store ID: {{ storeId }}</p>
      <p>Marketplace: {{ marketplaceName }}</p>
      
      <!-- Gün seçimi (7,14,30,60) -->
      <select v-model="daySelection" @change="onDayChange">
        <option value="60">Last 60 days</option>
        <option value="30">Last 30 days</option>
        <option value="14">Last 14 days</option>
        <option value="7">Last 7 days</option>
      </select>
  
      <!-- Grafiği ayrı bir bileşene alalım -->
      <DailySalesChart :chartData="chartData" />
  
      <!-- Tablomuz -->
      <SalesTable />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import DailySalesChart from '../components/DailySalesChart.vue'
  import SalesTable from './SalesTable.vue'
  
  export default defineComponent({
    components: { DailySalesChart, SalesTable },

    setup() {
      const store = useStore()
      const daySelection = ref(30)

      const storeId = computed(() => store.state.user.storeId)
      const marketplaceName = computed(() => store.state.user.marketplaceName)
      const chartData = computed(() => store.state.chart.chartData)

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

  select {
    margin: 20px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin: 10px 0;
    font-size: 16px;
  }
  </style>
  