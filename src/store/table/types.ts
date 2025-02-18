export interface TableState {
  tableData: TableItem[]
  pageNumber: number
  selectedDates: string[]
  totalItems: number
  loading: boolean
}

export interface TableItem {
  asin: string
  sku: string
  productName: string
  qty: number
  amount: number
  shippingAmount: number
  qty2: number
  amount2: number
  shippingAmount2: number
  sortingAmount: number
  imageUrl: string
  refundPercentage: number | null
  date1?:RefundRateData
  date2?:RefundRateData
}

export interface RefundRate {
  sku: string
  refundRate: number
}

export interface DailySalesRequest {
  isDaysCompare: number
  marketplace: string
  pageNumber: number
  pageSize: number
  salesDate: string
  salesDate2: string
  sellerId: string
}

export interface SkuListResponse {
  ApiStatus: boolean
  ApiStatusCode: number
  ApiStatusMessage: string
  Data: {
    item: {
      selectedDate: string
      totalSale: number
      totalShippingAmount: number
      skuList: TableItem[]
    }
    Currency: string
  }
}

export interface RefundRateResponse {
  ApiStatus: boolean
  ApiStatusCode: number
  ApiStatusMessage: string
  Data: RefundRateData[]
}

export interface RefundRateData {
  sku: string
  refundAmount: number
  refundQuantity: number
  refundRate: number
  totalOrderCount: number
} 


export interface CombinedData {
  sku: string
  productName: string
  firstDayTotal: number
  firstDayUnits: number
  firstDayAvgPrice: number
}