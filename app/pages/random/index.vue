<script lang="ts" setup>
const { data: breweries } = await useBrewery().getRandomBrewery();
const brewery = computed(() => breweries?.value?.[0]);
</script>

<template>
  <div
    class="text-center grow flex flex-col items-center justify-center w-full">
    <h1 class="text-4xl font-serif font-bold">
      You should visit {{ brewery?.name }}
    </h1>
    <NuxtLink
      :to="`/brewery/${brewery?.id}`"
      class="bg-[#263A32] text-white p-2 inline-block px-5 py-2 mt-5 text-lg inline-block"
      >View brewery</NuxtLink
    >
  </div>
</template>
