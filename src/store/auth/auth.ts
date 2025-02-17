// src/store/auth.js
import apiService from '../../services/apiService'
import type { AuthState, LoginPayload, LoginResponse } from './types'

const state: AuthState = {
  accessToken: null
}

const getters = {
  isLoggedIn: (state: AuthState): boolean => !!state.accessToken
}

const mutations = {
  SET_ACCESS_TOKEN(state: AuthState, token: string): void {
        state.accessToken = token
  }
}

const actions = {
  async login({ commit }: { commit: any }, { email, password }: LoginPayload): Promise<boolean> {
    try {
      const payload = {
        Email: email,
        Password: password,
        GrantType: "password",
        Scope: "amazon_data",
        ClientId: "C0001",
        ClientSecret: "SECRET0001",
        RedirectUri: "https://api.eva.guru"
      }
      const response = await apiService.post<LoginResponse>('/oauth/token', payload)
  
      commit('SET_ACCESS_TOKEN', response.data.Data.AccessToken)
      
      commit('user/SET_LOGIN_EMAIL', email, { root: true })
      return response.data.ApiStatus
    } catch (error) {
      console.error('Login error:', error)
      return false
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
