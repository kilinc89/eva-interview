export interface UserState {
  storeId: string | null
  marketplaceName: string | null
}

export interface UserInfo {
  storeId: string
  marketplaceName: string
}

export interface UserInfoResponse {
  data: UserInfo
} 