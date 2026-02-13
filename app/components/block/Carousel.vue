<script setup lang="ts">
import { ref } from "vue";
import { type BreweryType } from "@/types/breweryTypes";

defineProps<{
  title: string;
  breweries: BreweryType[];
}>();

const sliderTrack = ref<HTMLDivElement | null>(null);
const isDragging = ref<boolean>(false);
const startX = ref<number>(0);
const scrollLeft = ref<number>(0);

const progressWidth = ref<number>(0);

const updateProgress = () => {
  if (!sliderTrack.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = sliderTrack.value;
  progressWidth.value = (scrollLeft / (scrollWidth - clientWidth)) * 100;
};

const scroll = (direction: "left" | "right") => {
  if (!sliderTrack.value) return;
  const amount = direction === "left" ? -400 : 400;
  sliderTrack.value.scrollBy({ left: amount, behavior: "smooth" });
};

const startDragging = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.pageX - sliderTrack.value!.offsetLeft;
  scrollLeft.value = sliderTrack.value!.scrollLeft;
};

const stopDragging = () => {
  isDragging.value = false;
};

const onDragging = (e: MouseEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.pageX - sliderTrack.value!.offsetLeft;
  const walk = (x - startX.value) * 2;
  sliderTrack.value!.scrollLeft = scrollLeft.value - walk;
};
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<template>
  <section
    class="w-full bg-transparent py-12"
    :class="{ 'cursor-grabbing': isDragging }">
    <div class="flex justify-between items-end mb-5 px-[5vw]" v-if="title">
      <div>
        <h2
          class="font-serif text-[2.5rem] lg:text-[3.5rem] font-normal leading-none tracking-tight !mb-0">
          {{ title }}
        </h2>
      </div>
      <div class="flex gap-2">
        <button
          @click="scroll('left')"
          class="bg-[#263A32] text-white w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
          aria-label="Previous">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5">
            <path
              d="M15 18l-6-6 6-6"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <button
          @click="scroll('right')"
          class="bg-[#263A32] text-white w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
          aria-label="Next">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5">
            <path
              d="M9 18l6-6-6-6"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Scroll Progress Bar -->
    <div class="relative w-[90%] mx-auto h-px bg-black/10 mb-8 overflow-hidden">
      <div
        class="absolute left-0 top-0 h-full bg-gradient-to-r from-black to-black transition-all duration-100 ease-out"
        :style="{ width: progressWidth + '%' }"></div>
    </div>

    <div
      ref="sliderTrack"
      class="w-full overflow-x-scroll scrollbar-hide cursor-grab px-[5vw] pb-4"
      @scroll="updateProgress"
      @mousedown="startDragging"
      @mousemove="onDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging">
      <div class="flex gap-8 w-max">
        <UiBreweryCard
          v-for="brewery in breweries"
          :key="brewery.id"
          :brewery="brewery" />
      </div>
    </div>
  </section>
</template>
