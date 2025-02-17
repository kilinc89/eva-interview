export interface UserState {
  loginEmail: string | null
  storeId: string | null
  marketplaceName: string | null

}

export interface Store {
  storeName: string
  storeId: string
  evaStoreId: string
  storeType: number
  region: string
  paidStatus: number
  pricingStatus: number
  paidDate: string
  reimbursementPackageTrialEndDate: string
  linkedDate: string
  marketplaceName: string
  marketplaceCode: string
  enableRepricing: boolean
}

export interface User {
  firstName: string
  lastName: string
  email: string
  countryCode: string
  callingCode: string
  telephoneNumber: string
  isAdmin: string
  store: Store[]
}

export interface PackageInformation {
  turnoverPackageInformation: {
    pricingStatus: number
    packageName: string
    monthlyFee: number
    lowerLimit: number
    upperLimit: number
    reimbursementCredit: number
  }
  skuPackageInformation: {
    packageName: string
    skuChargeFee: number
  }
}

export interface UserInfoResponse {
  ApiStatus: boolean
  ApiStatusCode: string
  ApiStatusMessage: string
  Data: {
    token: string
    user: User
    remainingReimbursementCredit: number
    monthlyReimbursementPackageCredit: number
    packageInformation: PackageInformation
    isLinkAccount: boolean
    linkAccountParameters: {
      developerName: string
      accountNumber: string
    }
  }
}

export interface UserInfo {
  storeId: string
  marketplaceName: string
} 