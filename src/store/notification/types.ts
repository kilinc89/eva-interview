export interface NotificationState {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  show: boolean
}

export interface ShowNotificationPayload {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
} 