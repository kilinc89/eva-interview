import type { NotificationState, ShowNotificationPayload } from './types'

const state: NotificationState = {
  message: '',
  type: 'info',
  show: false
}

const mutations = {
  SHOW_NOTIFICATION(state: NotificationState, payload: ShowNotificationPayload): void {
    state.message = payload.message
    state.type = payload.type
    state.show = true
  },
  HIDE_NOTIFICATION(state: NotificationState): void {
    state.show = false
  }
}

const actions = {
  showNotification({ commit }: { commit: any }, payload: ShowNotificationPayload): void {
    commit('SHOW_NOTIFICATION', payload)
    setTimeout(() => {
      commit('HIDE_NOTIFICATION')
    }, 3000)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 