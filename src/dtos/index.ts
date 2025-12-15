export interface PaginationDTO {
  paginaAtual: number
  itensPorPagina: number
  totalDePaginas: number
  totalDeItens: number
  nextPageUrl: string | null
  prevPageUrl: string | null
}

export interface SurgicalRequestItemDTO {
  id: number
  medico: {
    nome: string
  }
  paciente: {
    nome: string
    dataNascimento: string
  }
  convenio: {
    id: number
    nome: string
  }
  dataCriacao: string
}

export interface SurgicalRequestsResponseDTO {
  data: SurgicalRequestItemDTO[]
  paginacao: PaginationDTO
}
