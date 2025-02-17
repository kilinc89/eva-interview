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
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    daySelection: Number
  },
  emits: ['change'],
  setup(props, { emit }) {
    const localDaySelection = ref(props.daySelection)

    watch(localDaySelection, (newVal) => {
      emit('change', newVal)
    })

    return {
      localDaySelection
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