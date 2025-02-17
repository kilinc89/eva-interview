import axios from 'axios'
import type { RootState } from '../index'
import type { UserState, UserInfo, UserInfoResponse } from './types'

const state: UserState = {
  storeId: null,
  marketplaceName: null
}

const getters = {
  storeId: (state: UserState): string | null => state.storeId,
  marketplaceName: (state: UserState): string | null => state.marketplaceName
}

const mutations = {
  SET_USER_INFO(state: UserState, userInfo: UserInfo): void {
    state.storeId = userInfo.storeId
    state.marketplaceName = userInfo.marketplaceName
  }
}

const actions = {
  async fetchUserInfo(
    { commit, rootState }: { commit: any; rootState: RootState }
  ): Promise<void> {
    try {
      const token = rootState.auth.accessToken
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post<UserInfoResponse>(
        'https://iapitest.eva.guru/user/user-information',
        config
      )
      commit('SET_USER_INFO', {
        storeId: response.data.data.storeId,
        marketplaceName: response.data.data.marketplaceName
      })
    } catch (error) {
      console.error('User info error:', error)
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