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
  selectedDates: []
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
    dispatch('fetchDailySalesSkuList')
  },

  async fetchDailySalesSkuList(
    { commit, state, rootState }: { commit: any; state: TableState; rootState: RootState }
  ): Promise<void> {
    try {
      const token = rootState.auth.accessToken
      const { storeId, marketplaceName } = rootState.user
      const config = { headers: { Authorization: `Bearer ${token}` } }
      
      const isDaysCompare = state.selectedDates.length === 2 ? 1 : 0
      const salesDate = state.selectedDates[0] || ""
      const salesDate2 = state.selectedDates[1] || ""

      const body: DailySalesRequest = {
        isDaysCompare,
        marketplace: marketplaceName,
        pageNumber: state.pageNumber,
        pageSize: 30,
        salesDate,
        salesDate2,
        sellerId: storeId
      }

      const response = await axios.post<SkuListResponse>(
        'https://iapitest.eva.guru/data/daily-sales-sku-list',
        body,
        config
      )
      const skuList = response.data?.skuList || []

      const refundResponse = await axios.post<RefundRateResponse>(
        'https://iapitest.eva.guru/data/get-sku-refund-rate',
        { skuList },
        config
      )
      const refundRates = refundResponse.data.data

      const combinedData = skuList.map((skuItem: TableItem) => {
        const foundRefund = refundRates.find(r => r.sku === skuItem.sku)
        return {
          ...skuItem,
          refundRate: foundRefund ? foundRefund.refundRate : null
        }
      })

      commit('SET_TABLE_DATA', combinedData)
    } catch (error) {
      console.error('Daily Sales SKU List error:', error)
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