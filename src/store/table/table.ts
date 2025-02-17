import axios from 'axios'
import type { RootState } from '../index'
import type { 
  TableState, 
  TableItem, 
  DailySalesRequest, 
  SkuListResponse,
  RefundRateResponse 
} from './types'

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
  SET_TABLE_DATA(state: TableState, data: TableItem[]): void {
    state.tableData = data
  },
  SET_PAGE_NUMBER(state: TableState, page: number): void {
    state.pageNumber = page
  },
  SET_SELECTED_DATES(state: TableState, dates: string[]): void {
    state.selectedDates = dates
    console.log('Selected dates set:', dates)
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
    { commit, state, dispatch }: { commit: any; state: TableState; dispatch: any },
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
      console.log('Fetching daily sales SKU list')
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

      const response = await axios.post<SkuListResponse>(
        'https://iapitest.eva.guru/data/daily-sales-sku-list',
        body
      )

      if (response.data.skuList?.length) {
        const refundResponse = await axios.post<RefundRateResponse>(
          'https://iapitest.eva.guru/data/get-sku-refund-rate',
          { skuList: response.data.skuList }
        )

        const combinedData = response.data.skuList.map(skuItem => ({
          ...skuItem,
          refundRate: refundResponse.data.data.find(r => r.sku === skuItem.sku)?.refundRate || 0
        }))

        commit('SET_TABLE_DATA', combinedData)
        commit('SET_TOTAL_ITEMS', response.data.totalItems)
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