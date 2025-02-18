<template>
  <div class="table-container" v-if="selectedDates.length > 0">
    <div class="search-box">
      <input type="text" v-model="searchQuery" placeholder="Search SKU or Product Name" />
    </div>
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th v-if="selectedDates.length >= 1">
            {{ formatDate(selectedDates[0]) }}
            Sales / Units
            Avg. Selling Price
          </th>
          <th v-if="selectedDates.length === 2">
            {{ formatDate(selectedDates[1]) }}
            Sales / Units
            Avg. Selling Price
          </th>
          <th>SKU Refund Rate<br/>(Last 60 days)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.sku" class="expandable-row">
          <td>{{ item.sku }}</td>
          <td :title="item.productName">{{ item.productName }}</td>
          <td v-if="selectedDates.length >= 1">
            ${{ formatNumber(item.firstDayTotal) }} / {{ item.firstDayUnits }}
            <br/>
            ${{ formatNumber(item.firstDayAvgPrice) }}
          </td>
          <td v-if="selectedDates.length === 2">
            {{ formatSecondSalesUnits(item) }}
            <br/>
            {{ formatSecondDayAvgPrice(item) }}
          </td>
          <td>{{ formatNumber(item.refundRate) }}%</td>
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
    const searchQuery = ref('')


    console.log('props.selectedDates', props.selectedDates)
    console.log('store.state.table.tableData', store.state.table.tableData.value)


    const tableData = computed(() => {
      const data = store.state.table.tableData
      return data.map((item: any) => ({
        sku: item.sku,
        productName: item.productName,
        firstDayTotal: item.amount + item.amount2,
        firstDayUnits: item.qty + item.qty2,
        firstDayAvgPrice: calculateAvgPrice(item.amount + item.amount2, item.qty + item.qty2),
        secondDayTotal: (item.compareAmount || 0) + (item.compareAmount2 || 0),
        secondDayUnits: (item.compareQty || 0) + (item.compareQty2 || 0),
        secondDayAvgPrice: calculateAvgPrice(
          (item.compareAmount || 0) + (item.compareAmount2 || 0),
          (item.compareQty || 0) + (item.compareQty2 || 0)
        ),
        refundRate: item.refundPercantage || 0
      }))
    })

    const filteredData = computed(() => {
      if (!searchQuery.value) return tableData.value
      const query = searchQuery.value.toLowerCase()
      return tableData.value.filter((item: any) => 
        item.sku.toLowerCase().includes(query) || 
        item.productName.toLowerCase().includes(query)
      )
    })

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      return filteredData.value.slice(start, start + itemsPerPage)
    })

    const totalPages = computed(() => 
      Math.ceil(filteredData.value.length / itemsPerPage)
    )

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }).format(date)
    }

    const changePage = (page: number) => {
      currentPage.value = page
      const apiPage = Math.ceil(page * itemsPerPage / 30)
      store.dispatch('table/fetchDailySalesSkuList', apiPage)
    }

    const calculateAvgPrice = (total: number, units: number) => {
      if (!units || units === 0) return 0
      return total / units
    }

    const formatSecondSalesUnits = (item: any) => {
      if (!item.amount2 && !item.qty2) {
        return '$0.00 / 0'
      }
      return `$${formatNumber(item.amount2)} / ${item.qty2}`
    }


    const formatSecondDayAvgPrice = (item: any) => {
      if (!item.secondDayTotal && !item.secondDayUnits) {
        return '$0.00'
      }
      return `$${formatNumber(item.secondDayAvgPrice)}`
    }

    const formatNumber = (num: number | null) => {
      if (num === null || num === undefined || isNaN(num)) return 'NaN'
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
      formatNumber,
      searchQuery,
      formatDate,
        formatSecondSalesUnits,
      formatSecondDayAvgPrice,
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

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

th, td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  white-space: pre-line;
}

.expandable-row td {
  vertical-align: top;
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

td {
  white-space: nowrap;
}

.nan-value {
  color: #999;
  font-style: italic;
}

/* İsteğe bağlı: İkinci sütun için özel stil */
td:nth-child(4) {
  color: #666;
}

/* Product Name sütunu için özel stil */
td:nth-child(2) {
  max-width: 400px; /* veya istediğiniz genişlik */
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Diğer sütunlar için nowrap korunacak */
td:not(:nth-child(2)) {
  white-space: nowrap;
}

/* Tablo genişliğini korumak için */
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

/* Sütun genişliklerini ayarlama */
th:nth-child(1) { width: 15%; } /* SKU */
th:nth-child(2) { width: 40%; } /* Product Name */
th:nth-child(3) { width: 15%; } /* First Date */
th:nth-child(4) { width: 15%; } /* Second Date */
th:nth-child(5) { width: 15%; } /* Refund Rate */

/* Opsiyonel: Uzun metinler için hover'da tooltip gösterme */
td:nth-child(2) {
  position: relative;
}

td:nth-child(2):hover::after {
  content: attr(title);
  position: absolute;
  left: 0;
  top: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px;
  border-radius: 4px;
  z-index: 1;
  max-width: 300px;
  word-wrap: break-word;
}
</style> 