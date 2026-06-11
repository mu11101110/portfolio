<script setup lang="ts">
import RequireInputText from "~/components/parts/text/RequireInputText.vue";

const props = defineProps<{
  for: string;
  label: string;
  isRequire?: boolean;
}>();
</script>

<template>
  <div>
    <!-- 入力項目名 -->
    <label class="block mb-2 font-bold" :for="props.for"
      >{{ label }}<RequireInputText v-if="isRequire"
    /></label>
    <!-- 入力項目 -->
    <slot />
  </div>
</template>
