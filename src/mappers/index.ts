import { DateTime } from 'luxon'
import type { PaginationDTO, SurgicalRequestItemDTO } from '../dtos'
import type { PaginationModel, SurgicalRequestModel } from '../models'

export const surgicalRequestsMapper = {
  toModel: (dto: SurgicalRequestItemDTO): SurgicalRequestModel => ({
    id: dto.id,
    doctorName: dto.medico.nome,
    patientName: dto.paciente.nome,
    patientBirthdate: DateTime.fromFormat(
      dto.paciente.dataNascimento,
      'yyyy-MM-dd'
    ).toFormat('dd/MM/yyyy'),
    medicalAgreementName: dto.convenio.nome,
    createdAt: DateTime.fromISO(dto.dataCriacao).toFormat('dd/MM/yyyy HH:mm')
  })
}

export const paginationMapper = {
  toModel: (
    dto: PaginationDTO,
    order: 'ASC' | 'DESC' | null
  ): PaginationModel => ({
    itemsPerPage: dto.itensPorPagina,
    page: dto.paginaAtual,
    totalItems: dto.totalDeItens,
    totalPages: dto.totalDePaginas,
    order: order
  })
}
