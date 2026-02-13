<script setup lang="ts">
const route = useRoute();
const { data: brewery } = await useBrewery().getSingleBrewery(
  route.params.id as string,
);
</script>

<template>
  <div>
    <NuxtImg
      src="/images/brewery-image.jpg"
      alt="brewery"
      class="max-h-[300px] min-h-[350px] w-full object-cover" />
    <div class="px-[3%] py-5">
      <span class="tracking-[3px] font-bold text-sm text-[#C2A572] uppercase">
        {{ brewery?.brewery_type }} Brewery
      </span>
      <h1 class="text-4xl font-bold font-serif tracking-[-1px] mb-2 mt-1">
        {{ brewery?.name }}
      </h1>
      <p class="font-thin mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At deserunt
        ullam consequatur nisi earum vitae veniam, placeat perspiciatis
        cupiditate fugiat architecto veritatis enim vel laborum reprehenderit
        voluptates corporis officiis ipsum!
      </p>
      <UiButton
        v-if="brewery?.website_url"
        as="a"
        :href="brewery?.website_url"
        target="_blank"
        class="mb-5 text-lg"
        >Visit website</UiButton
      >
      <ClientOnly>
        <UiMap
          class="mb-5"
          :zoom="12"
          :center="[Number(brewery?.latitude), Number(brewery?.longitude)]"
          :markers="[
            {
              lat: Number(brewery?.latitude),
              lng: Number(brewery?.longitude),
              name: brewery?.name || '',
              id: brewery?.id,
            },
          ]" />
      </ClientOnly>
      <address
        class="bg-[#263A32] p-5 text-white not-italic grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h3 class="font-serif font-bold text-lg">Contact details</h3>
          <a :href="`tel:${brewery?.phone}`">{{ brewery?.phone }}</a>
        </div>
        <div>
          <h3 class="font-serif font-bold text-lg">Address</h3>
          <p>
            {{ brewery?.address_1 }} {{ brewery?.address_2 }}
            {{ brewery?.address_3 }} {{ brewery?.city }},
            {{ brewery?.state_province }} {{ brewery?.postal_code }},
            {{ brewery?.country }}.
          </p>
        </div>
      </address>
    </div>
  </div>
</template>
