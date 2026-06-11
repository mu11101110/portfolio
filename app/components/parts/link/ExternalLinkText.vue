<script setup lang="ts">
defineProps<{
  url: string;
  label: string;
}>();
</script>

<template>
  <!-- NOTE: rel="noopener noreferrer" は NuxtLink が自動で付与するため、記載しない -->
  <NuxtLink
    class="inline-flex items-center after:i-ic-open-in-new after:size-4 after:ml-1"
    :to="url"
    target="_blank"
    >{{ label }}</NuxtLink
  >
</template>
