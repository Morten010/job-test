<script setup lang="ts">
import navbarLinks from "@/constants/navbar";
</script>

<template>
  <nav
    class="text-white bg-[#263A32] flex justify-between max-sm:flex-col items-center gap-5 px-[3%] py-5">
    <NuxtLink to="/" class="font-bold text-xl upp"> Brewery finder </NuxtLink>
    <ul class="flex gap-5">
      <li v-for="link in navbarLinks" :key="link.to">
        <NuxtLink
          class="text-white/80"
          active-class="underline text-white"
          :to="link.to"
          >{{ link.label }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>
