// src/store/index.js
import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import auth from './auth/auth'
import user from './user/user'
import chart from './chart/chart'
import table from './table/table'
import notification from './notification/notification'

export interface RootState {
  auth: {
    accessToken: string | null
  }
  user: {
    storeId: string
    marketplaceName: string
  }
  notification: {
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    show: boolean
  }
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export default createStore({
  modules: {
    auth,
    user,
    chart,
    table,
    notification
  }
})
