<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui'
  import type { SurgicalRequestModel } from '../models'
  import { useSurgicalRequests } from '../composables/useSurgicalRequests'
  import { toRefs } from 'vue'

  defineProps<{
    items: SurgicalRequestModel[]
    loading: boolean
  }>()

  const { handlePagination, pagination } = useSurgicalRequests()

  const { page, itemsPerPage, totalItems, order } = toRefs(pagination)

  const columns: TableColumn<SurgicalRequestModel>[] = [
    {
      header: 'Médico',
      accessorKey: 'doctorName'
    },
    {
      header: 'Paciente',
      accessorKey: 'patientName'
    },
    {
      header: 'Data de nascimento do paciente',
      accessorKey: 'patientBirthdate'
    },
    {
      header: 'Convênio',
      accessorKey: 'medicalAgreementName'
    },
    {
      header: 'Data da solicitação',
      accessorKey: 'createdAt'
    }
  ]
</script>

<template>
  <UCard>
    <UTable :data="items" :columns="columns" :loading="loading" />
    <template #footer>
      <div class="flex flex-wrap items-center justify-between gap-4">
        <UPagination
          v-model:page="page"
          :disabled="loading"
          :items-per-page="itemsPerPage"
          :total="totalItems"
          :sibling-count="1"
          :show-edges="true"
          :ui="{ list: 'flex-wrap' }"
          @update:page="
            (page: number) => {
              handlePagination({ page, itemsPerPage, order })
            }
          "
        />
        <label class="flex items-center gap-4">
          <span>Itens por página:</span>
          <USelect
            :disabled="loading"
            :default-value="itemsPerPage"
            size="lg"
            :items="[
              { label: '5', value: 5 },
              { label: '10', value: 10 },
              { label: '25', value: 25 },
              { label: '30', value: 30 },
              { label: '50', value: 50 }
            ]"
            class="w-24"
            @update:model-value="
              (value: number) => {
                handlePagination({ page, itemsPerPage: value, order })
              }
            "
          />
        </label>
      </div>
    </template>
  </UCard>
</template>
