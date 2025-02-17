export interface TableState {
  tableData: TableItem[]
  pageNumber: number
  selectedDates: string[]
}

export interface TableItem {
  sku: string
  refundRate: number | null
  [key: string]: any
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
  skuList: TableItem[]
}

export interface RefundRateResponse {
  data: RefundRate[]
} 