<script setup lang="ts">
import { useField } from "vee-validate";

const { modelValue, id, items, name, isRequire, disabled } = defineProps<{
  modelValue?: string;
  id: string;
  items: readonly string[];
  name?: string;
  isRequire?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { value, errors, validate, setValue } = useField(name ?? id, undefined, {
  initialValue: modelValue ?? "",
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setValue(target.value);
  emit("update:modelValue", target.value);
};

const isError = computed(() => errors.value.length > 0);
</script>

<template>
  <ul class="flex flex-wrap gap-x-6 gap-y-6">
    <li v-for="(item, index) in items" :key="id + '_item' + index">
      <div class="flex items-center">
        <input
          v-model="value"
          :id="id + index"
          :class="{ 'valid-error': isError }"
          :name="name ?? id"
          type="radio"
          :value="item"
          :required="index === 0 && isRequire"
          :disabled="disabled"
          @input="onInput"
          @blur="validate()"
        />
        <label
          :for="id + index"
          class="pl-2"
          :class="{ 'text-text-light': disabled }"
          >{{ item }}</label
        >
      </div>
    </li>
  </ul>
</template>
