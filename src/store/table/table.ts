import type { RootState } from '../index'
import type { 
  TableState, 
  TableItem, 
  DailySalesRequest, 
  SkuListResponse,
  RefundRateResponse 
} from './types'
import apiService from '../../services/apiService'

const state: TableState = {
  tableData: [],
  pageNumber: 1,
  selectedDates: [],
  totalItems: 0,
  loading: false
}

const getters = {
  tableData: (state: TableState): TableItem[] => state.tableData,
  selectedDates: (state: TableState): string[] => state.selectedDates
}

const mutations = {
  SET_TABLE_DATA(state: TableState, data: any[]): void {
    state.tableData = data
  },
  SET_PAGE_NUMBER(state: TableState, page: number): void {
    state.pageNumber = page
  },
  SET_SELECTED_DATES(state: TableState, dates: string[]): void {
    state.selectedDates = dates
  },
  SET_TOTAL_ITEMS(state: TableState, totalItems: number): void {
    state.totalItems = totalItems
  },
  SET_LOADING(state: TableState, loading: boolean): void {
    state.loading = loading
  }
}

const actions = {
  addOrRemoveDate(
    { commit, state }: { commit: any; state: TableState },
    date: string
  ): void {
    let newDates = [...state.selectedDates]
    if (newDates.includes(date)) {
      newDates = newDates.filter(d => d !== date)
    } else {
      if (newDates.length < 2) {
        newDates.push(date)
      } else {
        newDates.shift()
        newDates.push(date)
      }
    }
    commit('SET_SELECTED_DATES', newDates)
  },

  async fetchDailySalesSkuList(
    { commit, state, rootState }: { commit: any; state: TableState; rootState: RootState },
    pageNumber: number
  ): Promise<void> {
    try {
      commit('SET_LOADING', true)
      const { storeId, marketplaceName } = rootState.user
      
      const isDaysCompare = state.selectedDates.length === 2 ? 1 : 0
      const salesDate = state.selectedDates[0] || ""
      const salesDate2 = state.selectedDates[1] || ""

      const body: DailySalesRequest = {
        isDaysCompare,
        marketplace: marketplaceName ?? '',
        pageNumber,
        pageSize: 30,
        salesDate,
        salesDate2,
        sellerId: storeId ?? ''
      }

      const response = await apiService.post<SkuListResponse>(
        '/data/daily-sales-sku-list',
        body
      )

      if (response.data.Data.item.skuList?.length) {
        const refundResponse = await apiService.post<RefundRateResponse>(
          '/data/get-sku-refund-rate',
          {
            skuList: response.data.Data.item.skuList.map(item => item.sku),
            marketplace: marketplaceName ?? '',
            sellerId: storeId ?? '',
            requestedDay: 0
          }
        )

        const combinedData = response.data.Data.item.skuList.map(skuItem => {
          const refundData = refundResponse.data.Data.find(r => r.sku === skuItem.sku)
          return {
            ...skuItem,
            refundRate: refundData ? refundData.refundRate : 0
          }
        })

        commit('SET_TABLE_DATA', combinedData)
        commit('SET_TOTAL_ITEMS', response.data.Data.item.skuList.length)
      }
    } catch (error) {
      console.error('Daily Sales SKU List error:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 