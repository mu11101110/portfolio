<script setup lang="ts">
const {
  isHeaderCloseButton = true,
  isMessageModal = false,
  isSubmitting = false,
} = defineProps<{
  isHeaderCloseButton?: boolean;
  isMessageModal?: boolean;
  isSubmitting?: boolean;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    class="absolute z-20 w-[calc(100%-2rem)] max-h-[calc(100%-3rem)] overflow-y-scroll bg-white rounded-lg shadow-[0_0_8px_0_rgba(0,0,0,0.4)]"
    :class="[
      isMessageModal ? 'overflow-hidden max-w-[343px]' : 'lg:max-w-[1020px]',
    ]"
  >
    <div v-if="isHeaderCloseButton" class="flex justify-end-safe">
      <button
        class="size-6 rounded-full outline-secondary-light focus-visible:outline-2"
        :class="{ 'opacity-60 hover:cursor-not-allowed': isSubmitting }"
        aria-label="モーダルを閉じる"
        :disabled="isSubmitting"
        @click="$emit('close')"
      >
        <span
          class="i-ic-close"
          :class="{ 'hover-animation hover:opacity-60': !isSubmitting }"
        />
      </button>
    </div>
    <div
      class="px-2 pb-6"
      :class="{ 'lg:px-6': !isMessageModal, 'pt-6': !isHeaderCloseButton }"
    >
      <slot />
    </div>
  </div>
</template>
