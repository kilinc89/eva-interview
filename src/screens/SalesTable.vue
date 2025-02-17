<template>
    <div class="sales-table">
      <h3>Sales Table</h3>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Title</th>
            <th>Sales</th>
            <th>Refund Rate</th>
            <!-- diğer kolonlar -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in visibleData" :key="index">
            <td>{{ row.sku }}</td>
            <td>{{ row.title }}</td>
            <td>{{ row.sales }}</td>
            <td>{{ row.refundRate }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div>
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>Page: {{ currentPage }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    computed: {
      ...mapState('table', ['tableData', 'pageNumber']),
      currentPage() {
        // pageNumber ile local pagination sayfası farklı olabilir;
        // isterseniz sadece store'da tutun, isterseniz local bir state şeklinde de yapabilirsiniz.
        return this.localPage
      },
      // Her seferde 10 satır gösterelim
      visibleData() {
        const start = (this.localPage - 1) * 10
        const end = start + 10
        return this.tableData.slice(start, end)
      }
    },
    data() {
      return {
        localPage: 1
      }
    },
    methods: {
      ...mapActions('table', ['fetchDailySalesSkuList', 'SET_PAGE_NUMBER']),
      prevPage() {
        if (this.localPage > 1) {
          this.localPage--
          // Eğer 30'luk paketleri bitirdiyseniz, store’daki pageNumber’ı değiştirip yeniden fetchDailySalesSkuList çağırabilirsiniz.
          // Örneğin: her 3 local sayfada bir store’daki pageNumber’ı artırıp 30’luk yeni data çekebilirsiniz.
        }
      },
      nextPage() {
        // basit örnek
        const maxLocalPage = Math.ceil(this.tableData.length / 10)
        if (this.localPage < maxLocalPage) {
          this.localPage++
        } else {
          // Localdeki sayfa bitince store'daki pageNumber'ı artırıp tekrar fetchDailySalesSkuList yapabilirsiniz.
          // Örn:
          // this.SET_PAGE_NUMBER(this.pageNumber + 1)
          // this.fetchDailySalesSkuList()
        }
      }
    }
  }
  </script>
  