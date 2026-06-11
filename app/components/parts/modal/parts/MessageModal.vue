<script setup lang="ts">
import { useId } from "vue";
import Modal from "~/components/parts/modal/Modal.vue";
import FooterButton from "~/components/parts/modal/parts/ModalFooterButton.vue";
import type { ModalFooterButton } from "~/types/Modal";

const {
  isShow,
  text = "",
  isError,
  footerButton,
} = defineProps<{
  isShow: boolean;
  text?: string;
  isError?: boolean;
  footerButton: ModalFooterButton;
}>();

defineEmits<{
  next: [];
  back: [];
}>();

const messageTitleId = useId();
</script>

<template>
  <Modal
    :isShow="isShow"
    :isHeaderCloseButton="false"
    :ariaLabelledby="messageTitleId"
    isMessageModal
    @close="$emit('back')"
  >
    <p
      :id="messageTitleId"
      class="text-center"
      :class="{ 'text-highlight-error font-bold': isError }"
    >
      <slot>{{ text }}</slot>
    </p>
    <FooterButton
      :footerButton="footerButton"
      @back="$emit('back')"
      @next="$emit('next')"
    />
  </Modal>
</template>
