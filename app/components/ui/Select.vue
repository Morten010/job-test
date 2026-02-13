<script setup lang="ts">
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectItemIndicator,
} from "reka-ui";

interface Option {
  label: string;
  value: string;
}

defineProps<{
  options: Option[];
  placeholder?: string;
  modelValue?: string;
  label?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium">{{ label }}</label>
    <SelectRoot
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)">
      <SelectTrigger
        class="inline-flex items-center justify-between px-4 text-[13px] leading-none h-[50px] gap-[5px] bg-white text-violet11 hover:bg-mauve3 border border-gray-200 data-[placeholder]:text-violet9 outline-none">
        <SelectValue :placeholder="placeholder" />
        <Icon name="lucide:chevron-down" class="h-4 w-4 opacity-50" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="min-w-[160px] bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]">
          <SelectViewport class="p-[5px]">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              class="text-[13px] leading-none text-black flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-black data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-black cursor-pointer hover:bg-gray-100"
              :value="option.value">
              <SelectItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <Icon name="lucide:check" class="h-4 w-4" />
              </SelectItemIndicator>
              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
