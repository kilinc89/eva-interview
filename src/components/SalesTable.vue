<template>
  <div class="mt-5 bg-white rounded-lg p-5 shadow-md" v-if="selectedDates.length > 0">
  
    <table class="w-full table-fixed border-collapse">
      <thead>
        <tr>
          <th class="w-1/6 p-3 text-left bg-gray-100 font-semibold">SKU</th>
          <th class="w-2/5 p-3 text-left bg-gray-100 font-semibold">Product Name</th>
          <th v-if="selectedDates.length >= 1" class="w-1/6 p-3 text-left bg-gray-100 font-semibold">
            {{ formatDate(selectedDates[0]) }}
            Sales / Units
            Avg. Selling Price
          </th>
          <th v-if="selectedDates.length === 2" class="w-1/6 p-3 text-left bg-gray-100 font-semibold">
            {{ formatDate(selectedDates[1]) }}
            Sales / Units
            Avg. Selling Price
          </th>
          <th class="w-1/6 p-3 text-left bg-gray-100 font-semibold">SKU Refund Rate<br/>(Last 60 days)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.sku" class="border-b">
          <td class="p-3">{{ item.sku }}</td>
          <td class="p-3" :title="item.productName">{{ item.productName }}</td>
          <td v-if="selectedDates.length >= 1" class="p-3">
            ${{ formatNumber(item.firstDayTotal) }} / {{ item.firstDayUnits }}
            <br/>
            ${{ formatNumber(item.firstDayAvgPrice) }}
          </td>
          <td v-if="selectedDates.length === 2" class="p-3">
            {{ formatSecondSalesUnits(item) }}
            <br/>
            {{ formatSecondDayAvgPrice(item) }}
          </td>
          <td class="p-3">{{ formatNumber(item.refundRate) }}%</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center items-center gap-5 mt-5">
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
        class="px-4 py-2 border border-gray-300 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
        class="px-4 py-2 border border-gray-300 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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