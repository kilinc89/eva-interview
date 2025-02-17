import axios from 'axios'
import type { RootState } from '../index'
import type { ChartState, DailySalesRequest, ChartResponse } from './types'

const state: ChartState = {
  chartData: []
}

const getters = {
  chartData: (state: ChartState): any[] => state.chartData
}

const mutations = {
  SET_CHART_DATA(state: ChartState, data: any[]): void {
    state.chartData = data
  }
}

const actions = {
  async fetchDailySalesOverview(
    { commit, rootState }: { commit: any; rootState: RootState }, 
    daySelection: number
  ): Promise<void> {
    try {
      const token = rootState.auth.accessToken
      const { storeId, marketplaceName } = rootState.user
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      const body: DailySalesRequest = {
        customDateData: null,
        day: daySelection,
        excludeYoYData: true,
        marketplace: marketplaceName,
        requestStatus: 0,
        sellerId: storeId
      }

      const response = await axios.post<ChartResponse>(
        'https://iapitest.eva.guru/data/daily-sales-overview',
        body,
        config
      )
      commit('SET_CHART_DATA', response.data)
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