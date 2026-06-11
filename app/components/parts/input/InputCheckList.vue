<script setup lang="ts">
import { useField } from "vee-validate";

const { modelValue, id, items, name, disabled } = defineProps<{
  modelValue?: string[];
  id: string;
  items: readonly string[];
  name?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const { value, errors, validate, setValue } = useField<string[]>(
  name ?? id,
  undefined,
  {
    initialValue: modelValue ?? [],
  },
);

const indexMap = new Map(items.map((item, index) => [item, index]));

const toggleCheck = (check: string, checked: boolean) => {
  if (checked) {
    if (!value.value.includes(check)) value.value.push(check);
  } else {
    value.value = value.value.filter((c) => c !== check);
  }
  validate();

  // 入力された値を正しい順番に並び替えてから親に渡す
  const sortValue = value.value
    .slice()
    .sort((a, b) => (indexMap.get(a) ?? 0) - (indexMap.get(b) ?? 0));
  setValue(sortValue);

  emit("update:modelValue", value.value);
};

const isError = computed(() => errors.value.length > 0);
</script>

<template>
  <ul class="flex flex-wrap gap-x-6 gap-y-6">
    <li v-for="(item, index) in items" :key="'check' + index">
      <div class="flex items-center">
        <input
          v-model="value"
          :id="id + index"
          :class="{ 'valid-error': isError }"
          :name="name ?? id"
          type="checkbox"
          :value="item"
          :disabled="disabled"
          @change="
            (e) => toggleCheck(item, (e.target as HTMLInputElement).checked)
          "
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
