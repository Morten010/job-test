<script lang="ts" setup>
const breweryApi = useBrewery();

const { data: breweries } = await breweryApi.getBreweries({
  queryParams: { per_page: "200" },
});
</script>

<template>
  <section>
    <h2>Breweries by country</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
    </p>
    <ClientOnly>
      <UiMap />
    </ClientOnly>
  </section>
</template>
