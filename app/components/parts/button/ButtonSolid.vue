<script setup lang="ts">
import ButtonBase from "~/components/parts/button/parts/ButtonBase.vue";
import type { ButtonSize, ButtonType } from "~/types/Button";

const {
  label,
  size,
  type,
  confirmed = false,
  disabled = false,
  ariaLabel,
} = defineProps<{
  label: string;
  size: ButtonSize;
  type: ButtonType;
  confirmed?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}>();

const textColorClass = computed(() => {
  return disabled ? "text-text-light" : "text-white";
});

const backgroundColorClass = computed(() => {
  if (disabled) {
    return "bg-surface-disabled";
  }
  if (type === "delete") {
    return "bg-primary hover:bg-primary-light focus-visible:outline-primary-dark";
  }
  if (type === "submit" && confirmed) {
    return "bg-thirdly hover:bg-thirdly-light focus-visible:outline-thirdly-dark";
  }
  return "bg-secondary hover:bg-secondary-light focus-visible:outline-secondary-dark";
});
</script>

<template>
  <ButtonBase
    :label="label"
    :size="size"
    :type="type"
    class="focus-visible:outline-4"
    :class="[textColorClass, backgroundColorClass]"
    :disabled="disabled"
    :ariaLabel="ariaLabel"
  />
</template>
