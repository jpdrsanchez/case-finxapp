<script setup lang="ts">
  import { toRefs } from 'vue'

  import { medicalAgreements } from '../constants'
  import { useSurgicalRequests } from '../composables/useSurgicalRequests'

  const {
    pagination,
    filters,
    loading,
    handleFilters,
    handlePagination,
    resetFilters
  } = useSurgicalRequests()
  const { doctor, medicalAgreements: agreements, patient } = toRefs(filters)
  const { itemsPerPage, order } = toRefs(pagination)
</script>

<template>
  <div>
    <UCard :ui="{ root: 'ring-neutral-200' }">
      <div class="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-4">
        <UInput
          v-model="doctor"
          aria-label="Pesquisar por médico"
          name="doctor"
          :disabled="loading"
          color="secondary"
          size="lg"
          icon="i-lucide-book-heart"
          placeholder="Pesquisar por médico"
        />
        <UInput
          v-model="patient"
          aria-label="Pesquisar por paciente"
          name="patient"
          :disabled="loading"
          color="secondary"
          size="lg"
          icon="i-lucide-book-user"
          placeholder="Pesquisar por paciente"
        />
        <USelect
          v-model="agreements"
          aria-label="Pesquisar por convênio"
          name="medicalAgreements"
          :disabled="loading"
          placeholder="Pesquisar por convênio"
          size="lg"
          icon="i-lucide-heart-handshake"
          multiple
          :items="medicalAgreements"
          class="max-w-70"
        />
        <UButton
          aria-label="Pesquisar"
          :disabled="loading"
          color="primary"
          size="lg"
          icon="i-lucide-search"
          @click="handleFilters()"
        >
          Pesquisar
        </UButton>
        <UButton
          aria-label="Limpar Filtros"
          :disabled="loading"
          color="secondary"
          size="lg"
          icon="i-lucide-circle-x"
          @click="
            async () => {
              await resetFilters()
            }
          "
        >
          Limpar Filtros
        </UButton>
      </div>
    </UCard>
    <div class="my-6 flex items-center justify-end">
      <label class="flex items-center gap-4">
        <span>Ordenar por:</span>
        <USelect
          v-model="order as string"
          :disabled="loading"
          size="lg"
          :items="[
            { label: 'Data (mais recente)', value: 'DESC' },
            { label: 'Data (mais antiga)', value: 'ASC' }
          ]"
          class="w-48"
          @update:model-value="
            value => {
              handlePagination({
                page: 1,
                itemsPerPage,
                order: value as 'ASC' | 'DESC'
              })
            }
          "
        />
      </label>
    </div>
  </div>
</template>
