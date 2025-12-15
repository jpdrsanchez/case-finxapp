import { surgicalRequestFactory } from './factories'

export const surgicalRequestsDatasource = [
  {
    id: 1,
    medico: {
      nome: 'Afonso Silva'
    },
    paciente: {
      nome: 'Gustavo Santos',
      dataNascimento: '2023-08-21'
    },
    convenio: {
      id: 1,
      nome: 'Unimed'
    },
    dataCriacao: '2024-09-20T12:00:00Z'
  },
  {
    id: 2,
    medico: {
      nome: 'Fernando Gomes'
    },
    paciente: {
      nome: 'Jurandir Souza',
      dataNascimento: '1999-08-21'
    },
    convenio: {
      id: 2,
      nome: 'Bradesco'
    },
    dataCriacao: '2024-09-20T12:00:00Z'
  },
  ...Array.from({ length: 48 }, (_, i) => surgicalRequestFactory(i + 3))
] as const
