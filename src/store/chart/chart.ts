import apiService from '../../services/apiService'
import type { RootState } from '../index'
import type { ChartState, DailySalesRequest, ChartResponse, ChartItem } from './types'

const state: ChartState = {
  chartData: []
}

const getters = {
  chartData: (state: ChartState): any[] => state.chartData
}

const mutations = {
  SET_CHART_DATA(state: ChartState, data: ChartItem[]): void {
    console.log('Setting chart data:', data)
    state.chartData = data
  }
}

const actions = {
  async fetchDailySalesOverview(
    { commit, rootState }: { commit: any; rootState: RootState }, 
    daySelection: number
  ): Promise<void> {
    try {
  
      const { storeId, marketplaceName } = rootState.user
  

      if (!storeId || !marketplaceName) {
        throw new Error('Store ID or Marketplace Name is not available')
      }

      const body: DailySalesRequest = {
        customDateData: null,
        day: daySelection,
        excludeYoYData: true,
        marketplace: marketplaceName,
        requestStatus: 0,
        sellerId: storeId
      }

      const response = await apiService.post<ChartResponse>(
        '/data/daily-sales-overview',
        body,
      )

      
      if (response.data.ApiStatus) {
        commit('SET_CHART_DATA', response.data.Data.item)
      } else {
        console.error('Chart API error:', response.data.ApiStatusMessage)
      }
    } catch (error) {
      console.error('Daily Sales Overview error:', error)
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