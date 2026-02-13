<script lang="ts" setup>
const settings = ref<BreweryOptions>({
  by_city: undefined,
  by_country: undefined,
  by_dist: undefined,
  by_ids: undefined,
  by_name: undefined,
  by_state: undefined,
  by_postal: undefined,
  by_type: undefined,
  page: undefined,
  per_page: undefined,
  sort: undefined,
});
const size = ref(20);
const page = ref(1);
const queryParams = computed(() => ({
  per_page: size.value.toString(),
  page: page.value.toString(),
  ...Object.entries(settings.value).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  ),
}));

const { data: staticMeta } = await useBrewery().getBreweriesMeta();
const { data: currentMeta, status: metaStatus } =
  await useBrewery().getBreweriesMeta({
    queryParams,
  });
const { data: breweries, status: breweryStatus } =
  await useBrewery().getBreweries({ queryParams });

const isLoading = computed(
  () => metaStatus.value === "pending" || breweryStatus.value === "pending",
);

const breweryFilters = computed(() => {
  if (!staticMeta.value || !currentMeta.value) return {};

  const { total, page, per_page, ...filters } = staticMeta.value as any;
  const currentFilters = currentMeta.value as any;

  return Object.keys(filters).reduce(
    (acc: any, key: string) => {
      acc[key] = [
        { label: "All", value: undefined },
        ...Object.keys(filters[key]).map((item) => ({
          label: `${item} (${currentFilters[key]?.[item] || 0})`,
          value: item,
        })),
      ];
      return acc;
    },
    {} as Record<string, { label: string; value: string }[]>,
  );
});

const totalPages = computed(() =>
  Math.ceil(Number(currentMeta.value?.total || 0) / size.value),
);

watch(
  settings,
  () => {
    page.value = 1;
  },
  { deep: true },
);

const formatLabel = (key: any) => {
  if (typeof key !== "string") return "";
  const parts = key.split("_");
  if (parts.length > 1 && parts[1]) {
    return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  }
  return "";
};
</script>

<template>
  <main class="px-[3%] py-6">
    <h1 class="text-4xl font-semibold font-serif">All breweries</h1>
    <p class="mb-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae autem
      harum amet modi laboriosam enim dolorem culpa vel numquam ipsa. Aut
      doloremque hic excepturi. Magnam voluptate explicabo ad sed in!
    </p>

    <div class="grid grid-cols-2 md:grid-cols-6 gap-5">
      <UiSelect
        v-for="(one, two, index) in breweryFilters"
        :key="`${two}-${index}`"
        :label="formatLabel(two)"
        :options="one"
        v-model="(settings as any)[two]" />
    </div>

    <div class="py-5">Total: {{ currentMeta?.total }}</div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      <UiBreweryCard
        class="max-w-none md:min-w-none"
        v-for="brewery in breweries"
        :key="brewery.id"
        :brewery="brewery" />
    </div>
    <div
      class="flex justify-center items-center gap-5 mt-8 mb-2"
      v-if="Number(currentMeta?.total) > size">
      <UiButton @click="page--" :disabled="page <= 1 || isLoading"
        >Previous</UiButton
      >
      <div>{{ page }} / {{ totalPages }}</div>
      <UiButton @click="page++" :disabled="page >= totalPages || isLoading"
        >Next</UiButton
      >
    </div>
  </main>
</template>
