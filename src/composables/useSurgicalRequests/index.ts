import { reactive, ref } from 'vue'

import type { PaginationModel, SurgicalRequestModel } from '../../models'
import { finxappClient } from '../../api/instance'
import type { SurgicalRequestsResponseDTO } from '../../dtos'
import { paginationMapper, surgicalRequestsMapper } from '../../mappers'

import type { ListSurgicalRequestsRequest } from './types'

const loading = ref(false)
const error = ref(false)
const results = ref<SurgicalRequestModel[]>()

const filters = reactive({
  patient: '',
  doctor: '',
  medicalAgreements: [] as number[]
})

const pagination: PaginationModel = reactive({
  itemsPerPage: 10,
  page: 1,
  totalItems: 0,
  totalPages: 0,
  order: null
})

export const useSurgicalRequests = () => {
  const listSurgicalRequests = async (request: ListSurgicalRequestsRequest) => {
    try {
      error.value = false
      loading.value = true

      const response = await finxappClient.get<SurgicalRequestsResponseDTO>(
        'items',
        {
          params: {
            paginaAtual: request.page,
            itensPorPagina: request.itemsPerPage,
            dataCriacao: request.createdAt,
            paciente: request.patient,
            medico: request.doctor,
            ordenacao: request.order,
            convenios: request.medicalAgreements?.join(',')
          }
        }
      )
      results.value = response.data.data.map(surgicalRequestsMapper.toModel)
      Object.assign(
        pagination,
        paginationMapper.toModel(response.data.paginacao, request.order || null)
      )
    } catch {
      error.value = true
      results.value = undefined
    } finally {
      loading.value = false
    }
  }

  const handlePagination = async ({
    page,
    itemsPerPage,
    order
  }: {
    page?: number
    itemsPerPage?: number
    order?: 'ASC' | 'DESC' | null
  }) => {
    pagination.page = page ?? 1
    pagination.itemsPerPage = itemsPerPage ?? 10
    pagination.order = order ?? null

    await listSurgicalRequests({
      ...pagination,
      ...filters
    })
  }

  const handleFilters = async () => {
    Object.assign(pagination, {
      page: 1,
      totalItems: 0,
      totalPages: 0
    })

    await listSurgicalRequests({
      ...pagination,
      ...filters
    })
  }

  const resetFilters = async () => {
    Object.assign(pagination, {
      page: 1,
      order: null
    })

    Object.assign(filters, {
      patient: '',
      doctor: '',
      medicalAgreements: []
    })

    await listSurgicalRequests({
      ...pagination,
      ...filters
    })
  }

  return {
    listSurgicalRequests,
    handlePagination,
    handleFilters,
    resetFilters,
    filters,
    pagination,
    loading,
    error,
    results
  }
}
