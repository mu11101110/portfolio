<script setup lang="ts">
import InputFooterText from "~/components/parts/input/parts/InputFooterText.vue";
import RequireInputText from "~/components/parts/text/RequireInputText.vue";
import { formatAriaDescribedby } from "~/utils/formUtil";

const {
  label,
  isRequire = false,
  id = "",
  description,
  errorMessage,
} = defineProps<{
  label: string;
  isRequire?: boolean;
  id?: string;
  description?: string;
  errorMessage?: string;
}>();

const isError = computed(() => (errorMessage ? true : false));
</script>

<template>
  <fieldset
    :aria-describedby="formatAriaDescribedby(id, description, isError)"
    :aria-invalid="isError"
  >
    <legend class="block mb-2 font-bold">
      {{ label }}<RequireInputText v-if="isRequire" />
    </legend>
    <slot />
    <InputFooterText
      v-if="description || isError"
      :id="id"
      :description="description"
      :errorText="errorMessage"
    />
  </fieldset>
</template>
