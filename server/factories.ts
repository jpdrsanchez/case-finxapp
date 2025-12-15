import { faker } from '@faker-js/faker/locale/pt_BR'
import { DateTime } from 'luxon'

const birthdateFactory = () => {
  const generatedDate = faker.date.between({
    from: '1950-01-01T00:00:00.000Z',
    to: '2024-12-31T23:59:59.000Z'
  })

  const dateTime = DateTime.fromJSDate(generatedDate)

  return dateTime.setZone('UTC').toFormat('yyyy-MM-dd')
}

const createdAtFactory = () => {
  const generatedDate = faker.date.past()

  const dateTime = DateTime.fromJSDate(generatedDate)

  return dateTime.setZone('UTC').toISO()
}

const medicalAgreementFactory = () => {
  return faker.helpers.arrayElement([
    {
      id: 1,
      nome: 'Unimed'
    },
    {
      id: 2,
      nome: 'Bradesco'
    },
    {
      id: 3,
      nome: 'Amil'
    },
    {
      id: 4,
      nome: 'SulAmérica'
    },
    {
      id: 5,
      nome: 'Notredame'
    }
  ])
}

export const surgicalRequestFactory = (id: number) => {
  return {
    id,
    medico: {
      nome: faker.person.fullName()
    },
    paciente: {
      nome: faker.person.fullName(),
      dataNascimento: birthdateFactory()
    },
    convenio: medicalAgreementFactory(),
    dataCriacao: createdAtFactory()
  }
}
