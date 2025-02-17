<template>
  <div class="table-container" v-if="selectedDates.length > 0">
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Title</th>
          <th>ASIN</th>
          <th>FBA Sales</th>
          <th>FBM Sales</th>
          <th>Total Sales</th>
          <th>Units</th>
          <th>SKU RefundRate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.sku">
          <td>{{ item.sku }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.asin }}</td>
          <td>${{ formatNumber(item.amount) }}</td>
          <td>${{ formatNumber(item.amount2) }}</td>
          <td>${{ formatNumber(item.amount + item.amount2) }}</td>
          <td>{{ item.qty + item.qty2 }}</td>
          <td>{{ formatNumber(item.refundPercantage) }}%</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    selectedDates: {
      type: Array as () => string[],
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const currentPage = ref(1)
    const itemsPerPage = 10

    const tableData = computed(() => store.state.table.tableData)
    const totalItems = computed(() => store.state.table.totalItems)
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      return tableData.value.slice(start, start + itemsPerPage)
    })

    const changePage = (page: number) => {
      currentPage.value = page
      const apiPage = Math.ceil(page * itemsPerPage / 30)
      store.dispatch('table/fetchDailySalesSkuList', apiPage)
    }

    const formatNumber = (num: number) => {
      return num.toFixed(2)
    }

    watch(() => props.selectedDates, () => {
      currentPage.value = 1
      if (props.selectedDates.length > 0) {
        store.dispatch('table/fetchDailySalesSkuList', 1)
      }
    })

    return {
      paginatedData,
      currentPage,
      totalPages,
      changePage,
      formatNumber
    }
  }
})
</script>

<style scoped>
.table-container {
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 