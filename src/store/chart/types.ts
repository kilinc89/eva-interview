export interface ChartState {
  chartData: any[] // Replace 'any' with specific chart data type if available
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
  // API response type - adjust according to actual response
  data: any[]
} 