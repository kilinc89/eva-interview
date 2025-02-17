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
      <DailySalesChart :chartData="chartData"/>
  
      <!-- Tablomuz -->
      <SalesTable />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import DailySalesChart from './DailySalesChart.vue'
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
        store.dispatch('chart/fetchDailySalesOverview', daySelection.value)
      }

      onMounted(async () => {
        await store.dispatch('user/fetchUserInfo')
        store.dispatch('chart/fetchDailySalesOverview', daySelection.value)
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
  }

  select {
    margin: 20px 0;
    padding: 8px;
    border-radius: 4px;
  }
  </style>
  