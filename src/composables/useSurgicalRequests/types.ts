export interface ListSurgicalRequestsRequest {
  patient?: string
  doctor?: string
  medicalAgreements?: number[]
  page?: number
  itemsPerPage?: number
  order?: 'ASC' | 'DESC' | null
  createdAt?: string | null
}
