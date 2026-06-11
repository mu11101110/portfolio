<script setup lang="ts">
import type { ButtonType } from "~/types/Button";

defineProps<{
  label: string;
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: ButtonType;
  ariaLabel?: string;
}>();
</script>

<template>
  <button
    class="px-3 leading-0 text-base font-bold block"
    :class="{
      'h-8 rounded-lg': size === 'sm',
      'w-[9.9375rem] h-12 rounded-lg': size === 'md',
      'w-[21.375rem] h-18 rounded-xl': size === 'lg',
      'cursor-not-allowed': disabled,
      'hover-animation': !disabled,
    }"
    :type="type === 'submit' ? 'submit' : 'button'"
    :disabled="disabled"
    :aria-label="ariaLabel"
  >
    {{ label }}
  </button>
</template>
