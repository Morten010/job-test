<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const settings = computed({
  get: () => ({
    by_city: route.query.by_city as string,
    by_country: route.query.by_country as string,
    by_dist: route.query.by_dist as string,
    by_ids: route.query.by_ids as string,
    by_name: route.query.by_name as string,
    by_state: route.query.by_state as string,
    by_postal: route.query.by_postal as string,
    by_type: route.query.by_type as string,
    sort: route.query.sort as string,
  }),
  set: (val) => {
    const nextQuery = { ...route.query, ...val, page: "1" } as any;
    // Remove undefined or empty values from query
    Object.keys(nextQuery).forEach((key) => {
      if (nextQuery[key] === undefined || nextQuery[key] === "") {
        delete nextQuery[key];
      }
    });

    router.push({
      query: nextQuery,
    });
  },
});

const size = ref(20);
const page = computed({
  get: () => Number(route.query.page) || 1,
  set: (val) => {
    router.push({
      query: {
        ...route.query,
        page: val.toString(),
      },
    });
  },
});

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

const updateFilter = (key: string, value: any) => {
  const newSettings = { ...settings.value, [key]: value };
  settings.value = newSettings;
};

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
        :model-value="(settings as any)[two]"
        @update:model-value="updateFilter(two as string, $event)" />
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
      <UiButton @click="page = page - 1" :disabled="page <= 1 || isLoading"
        >Previous</UiButton
      >
      <div>{{ page }} / {{ totalPages }}</div>
      <UiButton
        @click="page = page + 1"
        :disabled="page >= totalPages || isLoading"
        >Next</UiButton
      >
    </div>
  </main>
</template>
