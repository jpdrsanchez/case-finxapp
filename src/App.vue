<script setup lang="ts">
  //
</script>

<template>
  <UApp>
    <UHeader title="Fin-x App" :ui="{ root: 'border-neutral-200' }">
      <template #title>
        <img
          class="h-10 max-w-full"
          src="https://finxapp.com.br/wp-content/uploads/2025/07/group.webp"
          alt="Fin-X App"
        />
      </template>
    </UHeader>
    <UMain>
      <RouterView />
    </UMain>
  </UApp>
</template>
