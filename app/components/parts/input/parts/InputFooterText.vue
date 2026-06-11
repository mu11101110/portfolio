<script setup lang="ts">
defineProps<{
  id: string;
  description?: string;
  errorText?: string;
}>();
</script>

<template>
  <!-- NOTE: 特定の箇所でしか使用しないため margin を付与 -->
  <div class="mt-2">
    <p v-if="description" :id="id + '-desc'" class="text-text-light">
      {{ description }}
    </p>
    <p
      v-if="errorText"
      :id="id + '-error'"
      class="text-highlight-error font-bold"
      role="alert"
    >
      {{ errorText }}
    </p>
  </div>
</template>
