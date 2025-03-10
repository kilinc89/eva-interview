export interface ChartState {
  chartData: ChartItem[]
}

export interface ChartItem {
  date: string
  amount: number
  fbaAmount: number
  fbmAmount: number
  orderCount: number
  fbaOrderCount: number
  fbmOrderCount: number
  unitCount: number
  fbaUnitCount: number
  fbmUnitCount: number
  avgSalesPrev30Days: number
  prevYearDate: number
  prevYearAmount: number
  prevYearFbaAmount: number
  prevYearFbmAmount: number
  prevYearShippingAmount: number
  prevYearFbaShippingAmount: number
  prevYearFbmShippingAmount: number
  prevYearOrderCount: number
  prevYearUnitCount: number
  yoy30DailySalesGrowth: number
  prevYearAvgSalesPrev30Days: number
  profit: number
  cogs: number
  amazonExpense: number
  totalExpense: number
  shippingAmount: number
  fbaShippingAmount: number
  fbmShippingAmount: number
  avgProfitPrev30Days: number
  avgAdvertisingCostPrev30Days: number
  advertisingCost: number
  acos: number
  refundTotalAmount: number
  totalVatAmount: number
  otherFee: number
}

export interface DailySalesRequest {
  customDateData: null
  day: number
  excludeYoYData: boolean
  marketplace: string
  requestStatus: number
  sellerId: string
}

export interface ChartResponse {
  ApiStatus: boolean
  ApiStatusCode: string
  ApiStatusMessage: string
  Data: {
    item: ChartItem[]
  }
} 