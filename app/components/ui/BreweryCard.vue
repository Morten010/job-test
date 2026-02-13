<script setup lang="ts">
import type { BreweryType } from "@/types/breweryTypes";
import { NuxtLink } from "#components";

defineProps<{
  brewery: BreweryType;
}>();
</script>

<template>
  <article
    :to="`/brewery/${brewery.id}`"
    v-bind="$attrs"
    :class="
      cn(
        'bg-[#263A32] text-white p-5 max-w-[250px] md:min-w-[400px] flex flex-col',
        $attrs?.class || '',
      )
    ">
    <span class="text-xs opacity-80 tracking-[2px] uppercase">
      {{ brewery.brewery_type }} Brewery
    </span>
    <h3 class="mb-1 text-xl font-serif font-bold tracking-[0px]">
      {{ brewery.name }}
    </h3>
    <p class="text-sm opacity-80">
      {{ brewery?.address_1 }} {{ brewery?.address_2 }} {{ brewery?.address_3 }}
      {{ brewery?.city }}, {{ brewery?.state_province }}
      {{ brewery?.postal_code }}, {{ brewery?.country }}.
    </p>
    <div class="grid gap-2 grid-cols-2 mt-auto pt-4">
      <UiButton
        :as="NuxtLink"
        :to="`/brewery/${brewery.id}`"
        variant="inverted"
        class="w-full"
        >Read more</UiButton
      >
      <UiButton
        as="a"
        :href="brewery.website_url"
        target="_blank"
        variant="outline-white"
        class="w-full"
        >Go to website</UiButton
      >
    </div>
  </article>
</template>
