import { http, HttpResponse } from 'msw'
import { surgicalRequestsDatasource } from './datasources'
import { DateTime } from 'luxon'

export const handlers = [
  http.get('https://finxapp.com/api/items', async ({ request }) => {
    const url = new URL(request.url)

    const currentPage = url.searchParams.get('paginaAtual')
      ? Number(url.searchParams.get('paginaAtual'))
      : 1
    const itemsPerPage = url.searchParams.get('itensPorPagina')
      ? Number(url.searchParams.get('itensPorPagina'))
      : 10
    const createdAt = url.searchParams.get('dataCriacao')
      ? DateTime.fromISO(url.searchParams.get('dataCriacao')!)
      : null
    const patient = url.searchParams.get('paciente')
    const doctor = url.searchParams.get('medico')
    const medicalAgreements = url.searchParams.get('convenios')
    const sorting = url.searchParams.get('ordenacao')

    let results = [...surgicalRequestsDatasource]

    if (sorting === 'ASC' || sorting === 'DESC') {
      results.sort((a, b) => {
        const dateA = DateTime.fromISO(a.dataCriacao!)
        const dateB = DateTime.fromISO(b.dataCriacao!)

        if (sorting === 'ASC') {
          if (dateA < dateB) return -1
          if (dateA > dateB) return 1
          return 0
        }

        if (sorting === 'DESC') {
          if (dateB < dateA) return -1
          if (dateB > dateA) return 1
          return 0
        }

        return 0
      })
    }

    if (createdAt?.isValid) {
      results = [...results].filter(item => {
        const itemDate = DateTime.fromISO(item.dataCriacao!)

        return (
          itemDate.year === createdAt.year &&
          itemDate.month === createdAt.month &&
          itemDate.day === createdAt.day
        )
      })
    }

    if (doctor?.length) {
      results = [...results].filter(item => item.medico.nome.includes(doctor))
    }

    if (patient?.length) {
      results = [...results].filter(item =>
        item.paciente.nome.includes(patient)
      )
    }

    if (medicalAgreements?.length) {
      const agreementIds = medicalAgreements.split(',').map(id => Number(id))

      results = [...results].filter(item =>
        agreementIds.includes(item.convenio.id)
      )
    }

    const totalPages = Math.ceil(results.length / itemsPerPage)

    await new Promise(resolve => setTimeout(resolve, 2000))

    if (!results.length)
      return HttpResponse.json(
        {
          message: 'not found'
        },
        { status: 404 }
      )

    return HttpResponse.json({
      data: results.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      ),
      paginacao: {
        paginaAtual: currentPage,
        itensPorPagina: itemsPerPage,
        totalDePaginas: totalPages,
        totalDeItens: results.length,
        nextPageUrl: `/api/items?paginaAtual=${currentPage + 1}`,
        prevPageUrl: null
      }
    })
  })
]
