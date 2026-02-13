<script setup>
const { data: breweries } = await useBrewery().getBreweries({
  queryParams: { per_page: "200" },
});
const markers = computed(() => {
  return breweries?.value?.reduce((acc, brewery) => {
    if (brewery.latitude && brewery.longitude) {
      acc.push({
        lat: brewery.latitude,
        lng: brewery.longitude,
        name: brewery.name,
        id: brewery.id,
      });
    }
    return acc;
  }, []);
});
</script>

<template>
  <BlockTopbanner />
  <BlockCarousel
    v-if="breweries"
    :breweries="breweries?.slice(0, 10)"
    title="Top breweries" />
  <ClientOnly v-if="breweries" fallback-tag="span" fallback="Loading map...">
    <UiMap :markers="markers" />
  </ClientOnly>
</template>
