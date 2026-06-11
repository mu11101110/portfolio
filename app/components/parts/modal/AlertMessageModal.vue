<script setup lang="ts">
import MessageModal from "~/components/parts/modal/parts/MessageModal.vue";
import type { ModalFooterButton } from "~/types/Modal";

const {
  isShow,
  text = "",
  footerButton,
} = defineProps<{
  isShow: boolean;
  text?: string;
  footerButton: ModalFooterButton;
}>();

defineEmits<{
  next: [];
  back: [];
}>();
</script>

<template>
  <MessageModal
    :isShow="isShow"
    :footerButton="footerButton"
    @back="$emit('back')"
    @next="$emit('next')"
  >
    <slot>{{ text }}</slot>
  </MessageModal>
</template>
