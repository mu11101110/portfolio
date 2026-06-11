<script setup lang="ts">
import FooterButton from "~/components/parts/modal/parts/ModalFooterButton.vue";
import InputContent from "~/components/pages/top/modal/pages/parts/InputContent.vue";
import type { ContactSchema as Schema } from "~/schema/contact";
import type { ModalFooterButton } from "~/types/Modal";

defineProps<{
  id: string;
  inputData: Schema;
}>();

defineEmits<{
  close: [];
}>();

const footerButton: ModalFooterButton = {
  backButton: {
    label: "閉じる",
    ariaLabel: "モーダルを閉じる",
  },
};
</script>

<template>
  <h3 :id="id" class="mb-1">送信が完了しました</h3>
  <p class="mb-5">
    以下の内容で問い合わせが完了しました。<br />
    ご入力されたメールアドレス宛てに自動返信メールを送信しましたので、ご確認ください。<br />
    ※実際のメール送信や自動返信は行われません。
  </p>
  <InputContent :data="inputData" />
  <FooterButton :footerButton="footerButton" @back="$emit('close')" />
</template>
