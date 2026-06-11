<script setup lang="ts">
import { useField } from "vee-validate";
import InputFooterText from "./parts/InputFooterText.vue";
import { formatAriaDescribedby } from "~/utils/formUtil";

const {
  modelValue,
  id,
  name,
  type = "text",
  isRequire,
  placeholder,
  autocomplete,
  disabled,
  description = "",
} = defineProps<{
  modelValue?: string;
  id: string;
  name?: string;
  type?: "text" | "email";
  isRequire?: boolean;
  placeholder?: string;
  autocomplete?: string;
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
  <input
    v-model="value"
    :id="id"
    class="px-4"
    :class="{ 'valid-error': isError }"
    :name="name ?? id"
    :type="type"
    :required="isRequire"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :aria-describedby="formatAriaDescribedby(id, description, isError)"
    :aria-invalid="isError"
    @input="onInput"
    @blur="validate()"
  />
  <InputFooterText
    v-if="description || isError"
    :id="id"
    :description="description"
    :errorText="errorMessage"
  />
</template>
