<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useSurgicalRequests } from '../composables/useSurgicalRequests'

  const { listSurgicalRequests, resetFilters, results, loading, error } =
    useSurgicalRequests()

  onMounted(async () => {
    await listSurgicalRequests({
      page: 1,
      itemsPerPage: 10
    })
  })
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Solicitações Cirúrgicas"
        description="Preencha os filtros abaixo para consultar os agendamentos cirurgicos."
        :ui="{
          root: 'border-neutral-200',
          title: 'text-secondary',
          description: 'text-neutral-500'
        }"
      />
      <UPageBody>
        <SurgicalRequestsFilters />
        <SurgicalRequestsTable
          v-if="results?.length"
          :items="results"
          :loading="loading"
        />
        <USkeleton v-if="!results?.length && loading" class="h-173.5 w-full" />
        <UEmpty
          v-if="!results?.length && !loading && error"
          icon="i-lucide-file"
          title="Nenhum resultado encontrado"
          description="Tente ajustar os filtros para encontrar o que procura."
          :actions="[
            {
              icon: 'i-lucide-refresh-cw',
              label: 'Recarregar',
              color: 'primary',
              size: 'lg',
              onClick: () => resetFilters()
            }
          ]"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
