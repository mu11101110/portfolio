<script setup lang="ts">
import ButtonBase from "~/components/parts/button/parts/ButtonBase.vue";
import type { ButtonSize } from "~/types/Button";

const {
  label,
  size,
  disabled = false,
  ariaLabel,
} = defineProps<{
  label: string;
  size: ButtonSize;
  disabled?: boolean;
  ariaLabel?: string;
}>();
</script>

<template>
  <ButtonBase
    class="border-2"
    :class="[
      disabled
        ? 'text-text-light border-text-light bg-surface-white'
        : 'text-secondary border-secondary bg-white hover:text-secondary-light hover:border-secondary-light focus-visible:outline-4 focus-visible:outline-secondary-dark',
    ]"
    :label="label"
    :size="size"
    :disabled="disabled"
    :ariaLabel="ariaLabel"
  />
</template>
