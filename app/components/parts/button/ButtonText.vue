<script setup lang="ts">
const { label, disabled = false } = defineProps<{
  label: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    type="button"
    class="underline"
    :class="[
      disabled
        ? 'text-text-light cursor-not-allowed'
        : 'hover-animation text-secondary hover:text-secondary-light',
    ]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>
