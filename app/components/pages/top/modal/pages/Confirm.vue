<script setup lang="ts">
import FooterButton from "~/components/parts/modal/parts/ModalFooterButton.vue";
import InputContent from "~/components/pages/top/modal/pages/parts/InputContent.vue";
import type { ContactSchema as Schema } from "~/schema/contact";
import type { ModalFooterButton } from "~/types/Modal";

const {
  id,
  inputData,
  isSubmitting = false,
} = defineProps<{
  id: string;
  inputData: Schema;
  isSubmitting?: boolean;
}>();

defineEmits<{
  back: [];
  next: [];
}>();

const footerButton = computed<ModalFooterButton>(() => ({
  backButton: {
    label: "修正する",
    ariaLabel: "戻って入力内容を修正する",
    disabled: isSubmitting,
  },
  nextButton: {
    label: isSubmitting ? "送信中" : "送信する",
    ariaLabel: "現在の入力内容でメールを送信する",
    type: "submit",
    confirmed: true,
    disabled: isSubmitting,
  },
}));
</script>

<template>
  <h3 :id="id" class="mb-1">入力内容確認</h3>
  <p class="mb-5">
    ご入力内容をご確認の上、問題がなければ送信するボタンを押してください。<br />
    ※実際のメール送信は行われません。
  </p>
  <InputContent :data="inputData" />
  <FooterButton
    :footerButton="footerButton"
    @back="$emit('back')"
    @next="$emit('next')"
  />
</template>
