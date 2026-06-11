<script setup lang="ts">
import { useField } from "vee-validate";
import InputFooterText from "./parts/InputFooterText.vue";
import { formatAriaDescribedby } from "~/utils/formUtil";

const {
  modelValue,
  id,
  options,
  name,
  isRequire,
  disabled,
  description = "",
} = defineProps<{
  modelValue?: string;
  id: string;
  options: readonly string[];
  name?: string;
  isRequire?: boolean;
  disabled?: boolean;
  description?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { value, errors, errorMessage, validate, setValue } = useField(
  name ?? id,
  undefined,
  {
    initialValue: modelValue ?? "",
  },
);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setValue(target.value);
  emit("update:modelValue", target.value);
};

const isError = computed(() => errors.value.length > 0);
</script>

<template>
  <div
    class="relative after:i-ic-keyboard-arrow-down after:size-8 after:absolute after:top-2 after:right-2"
    :class="[
      isError
        ? 'after:text-highlight-error'
        : disabled
          ? 'after:text-text-light'
          : 'after:text-secondary-light',
    ]"
  >
    <select
      v-model="value"
      :id="id"
      class="pr-10 pl-4"
      :class="{ 'valid-error': isError }"
      :name="name ?? id"
      :disabled="disabled"
      :aria-describedby="formatAriaDescribedby(id, description, isError)"
      :aria-invalid="isError"
      :required="isRequire"
      @input="onInput"
      @blur="validate()"
    >
      <option value="">選択してください</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
  <InputFooterText
    v-if="description || isError"
    :id="id"
    :description="description"
    :errorText="errorMessage"
  />
</template>
