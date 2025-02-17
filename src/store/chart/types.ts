export interface ChartState {
  chartData: ChartItem[]
}

export interface ChartItem {
  date: string
  amount: number
  orderCount: number
  unitCount: number
  avgSalesPrev30Days: number
  prevYearDate: string
  prevYearAmount: number
  prevYearOrderCount: number
  prevYearUnitCount: number
  prevYearAvgSalesPrev30Days: number
  profit: number
  yoy30DailySalesGrowth: number
  acos: number
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
    Currency: string
    item: ChartItem[]
    isYoyExist: boolean
  }
} 