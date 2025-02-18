<template>
  <div class="flex justify-between items-center mb-6 p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>
    <select v-model="localDaySelection" @change="emitChange" class="block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option value="60">Last 60 days</option>
      <option value="30">Last 30 days</option>
      <option value="14">Last 14 days</option>
      <option value="7">Last 7 days</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
  
export default defineComponent({
  props: {
    daySelection: Number
  },
  setup(props) {
    const localDaySelection = ref(props.daySelection)
    const store = useStore()

    const emitChange = () => {
      store.dispatch('chart/fetchDailySalesOverview', localDaySelection.value)
    }

    return {
      localDaySelection,
      emitChange
    }
  }
})
</script>

<style scoped>
/* Removed custom styles as Tailwind handles styling */
</style> 