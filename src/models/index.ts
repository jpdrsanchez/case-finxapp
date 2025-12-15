export interface SurgicalRequestModel {
  id: number
  doctorName: string
  patientName: string
  patientBirthdate: string
  medicalAgreementName: string
  createdAt: string
}

export interface PaginationModel {
  page: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
  order: string
}
