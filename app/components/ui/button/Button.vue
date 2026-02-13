<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from "./button-variants";
import { Primitive } from "reka-ui";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./button-variants";

interface Props extends /* @vue-ignore */ PrimitiveProps {
  as?: string | object;
  asChild?: boolean;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        props.class,
      )
    ">
    <slot />
  </Primitive>
</template>
