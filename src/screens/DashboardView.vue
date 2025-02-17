<template>
    <div class="dashboard">
      <UserInfo :storeId="storeId" :marketplaceName="marketplaceName" />
      <Header :daySelection="daySelection"  />
      <DailySalesChart :chartData="chartData" />
      <SalesTable :selectedDates="selectedDates" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import DailySalesChart from '../components/DailySalesChart.vue'
  import SalesTable from '../components/SalesTable.vue'
  import UserInfo from '../components/UserInfo.vue'
  import Header from '../components/Header.vue'
  
  export default defineComponent({
    components: { DailySalesChart, SalesTable, UserInfo, Header },

    setup() {
      const store = useStore()
      const daySelection = ref(30)

      const storeId = computed(() => store.state.user.storeId)
      const marketplaceName = computed(() => store.state.user.marketplaceName)
      const chartData = computed(() => store.state.chart.chartData)
      const selectedDates = computed(() => store.state.table.selectedDates)

   
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
  </style>
  