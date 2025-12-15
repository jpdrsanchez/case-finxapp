export interface ListSurgicalRequestsRequest {
  patient?: string
  doctor?: string
  medicalAgreements?: number[]
  page?: number
  itemsPerPage?: number
  order?: string
  createdAt?: string | null
}
