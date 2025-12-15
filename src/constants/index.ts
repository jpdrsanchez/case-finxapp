import type { SelectItem } from '@nuxt/ui'

export const medicalAgreements: SelectItem[] = [
  {
    value: 1,
    label: 'Unimed'
  },
  {
    value: 2,
    label: 'Bradesco'
  },
  {
    value: 3,
    label: 'Amil'
  },
  {
    value: 4,
    label: 'SulAmérica'
  },
  {
    value: 5,
    label: 'Notredame'
  }
] as const
