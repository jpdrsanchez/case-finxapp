import { mount } from '@vue/test-utils'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import SurgicalRequestsView from '../SurgicalRequestsView.vue'
import { server } from '../../../server/server'
import { nextTick } from 'vue'
import { beforeEach } from 'vitest'

beforeAll(() => server.listen())
beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  server.resetHandlers()
  vi.useRealTimers()
})
afterAll(() => server.close())

describe('SurgicalRequestsView', () => {
  it('should render the first 10 results without filters on first load', async () => {
    const wrapper = mount(SurgicalRequestsView)

    expect(wrapper.find('table').exists()).toBe(false)

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.findAll('tbody tr')).toHaveLength(10)

    const firstRow = wrapper.find('tbody tr')

    expect(firstRow.text()).toContain('Afonso Silva')
    expect(firstRow.text()).toContain('Gustavo Santos')
    expect(firstRow.text()).toContain('21/08/2023')
    expect(firstRow.text()).toContain('Unimed')
    expect(firstRow.text()).toContain('20/09/2024 09:00')
  })

  it('should apply filters and render the correct results', async () => {
    const wrapper = mount(SurgicalRequestsView)

    const doctorInput = wrapper.find('input[name="doctor"]')
    const patientInput = wrapper.find('input[name="patient"]')
    const medicalAgreementsSelect = wrapper.find(
      'select[name="medicalAgreements"]'
    )
    const searchButton = wrapper.find('button[aria-label="Pesquisar"]')
    const clearFiltersButton = wrapper.find(
      'button[aria-label="Limpar Filtros"]'
    )

    expect(doctorInput.html()).toContain('Pesquisar por médico')
    expect(patientInput.html()).toContain('Pesquisar por paciente')
    expect(medicalAgreementsSelect.html()).toContain('medicalAgreements')
    expect(searchButton.text()).toBe('Pesquisar')
    expect(clearFiltersButton.text()).toBe('Limpar Filtros')

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.findAll('tbody tr')).toHaveLength(10)

    await doctorInput.setValue('Afonso')
    await searchButton.trigger('click')

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(1)

    await patientInput.setValue('Gustavo')
    await searchButton.trigger('click')

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(1)

    await patientInput.setValue('Teste')
    await searchButton.trigger('click')

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(0)
    expect(wrapper.find('h2').text()).toBe('Nenhum resultado encontrado')
  })

  it('should reset filters and render the first 10 results', async () => {
    const wrapper = mount(SurgicalRequestsView)

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    const doctorInput = wrapper.find('input[name="doctor"]')
    const searchButton = wrapper.find('button[aria-label="Pesquisar"]')
    const clearFiltersButton = wrapper.find(
      'button[aria-label="Limpar Filtros"]'
    )

    expect(doctorInput.html()).toContain('Pesquisar por médico')

    await doctorInput.setValue('Afonso')
    await searchButton.trigger('click')

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(0)

    await clearFiltersButton.trigger('click')

    await vi.advanceTimersByTimeAsync(3000)
    await nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(10)
  })
})
