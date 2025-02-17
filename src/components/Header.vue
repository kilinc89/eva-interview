<template>
  <div class="header">
    <h2>Dashboard</h2>
    <select v-model="localDaySelection" @change="emitChange" class="day-select">
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
      store.dispatch('chart/fetchDailySalesOverview',localDaySelection.value)
    }

 
    return {
      localDaySelection,
      emitChange
    }
  }
})
</script>

<style scoped>
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
</style> 