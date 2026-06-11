<script setup lang="ts">
import MessageModal from "~/components/parts/modal/parts/MessageModal.vue";
import type { ModalFooterButton } from "~/types/Modal";

const {
  isShow,
  text,
  footerButton = {
    backButton: {
      label: "閉じる",
      ariaLabel: "エラーメッセージを閉じる",
    },
  },
} = defineProps<{
  isShow: boolean;
  text: string;
  footerButton?: ModalFooterButton;
}>();

defineEmits<{
  back: [];
}>();
</script>

<template>
  <MessageModal
    :isShow="isShow"
    :text="text"
    isError
    :footerButton="footerButton"
    @back="$emit('back')"
  />
</template>
