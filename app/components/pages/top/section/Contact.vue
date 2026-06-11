<script setup lang="ts">
import ButtonSolid from "~/components/parts/button/ButtonSolid.vue";
import AlertMessageModal from "~/components/parts/modal/AlertMessageModal.vue";
import ContactFormModal from "~/components/pages/top/modal/ContactFormModal.vue";
import type { ContactSchema as Schema } from "~/schema/contact";
import type { Gender, Prefectures, InquiryList } from "~/types/Input";
import type {
  ContactFormModalStep,
  ModalFooterButton,
  ModalVisibility,
} from "~/types/Modal";

defineProps<{
  inputData: Schema | null;
  isContactFormModal: boolean;
  isContactFormModalStep1: boolean;
  isContactFormModalStep2: boolean;
  isContactFormModalStep3: boolean;
  isContactFormAlertModal: boolean;
  isSubmittingContactForm: boolean;
}>();

defineEmits<{
  toggleContactFormModal: [action: ModalVisibility];
  resetContactFormModal: [];
  showContactFormModalStep: [target: ContactFormModalStep, data?: Schema];
  submitContactForm: [];
  toggleContactFormAlertModal: [action: ModalVisibility];
}>();

// フォーム入力内容
const name = defineModel<string>("name", {
  required: true,
});
const prefectures = defineModel<(typeof Prefectures)[number] | "">(
  "prefectures",
  {
    required: true,
  },
);
const email = defineModel<string>("email", {
  required: true,
});
const gender = defineModel<(typeof Gender)[number]>("gender", {
  required: true,
});
const inquiry = defineModel<(typeof InquiryList)[number][] | []>("inquiry", {
  required: true,
});

// クローズ確認モーダルフッターボタン
const alertModalFooterButton: ModalFooterButton = {
  backButton: {
    label: "戻る",
    ariaLabel: "入力を続ける",
  },
  nextButton: {
    label: "閉じる",
    ariaLabel: "入力を破棄して閉じる",
    type: "delete",
  },
};
</script>

<template>
  <section class="section-base-px">
    <h2 class="mb-5">CONTACT</h2>
    <p class="text-center mb-4">
      入力、確認、完了までの流れを<br
        class="md:hidden"
      />確認できるフォームです。<br />
      送信処理はモック API で再現しています。
    </p>
    <p class="text-center">
      モーダル内にフォーカスを保ち、<br />タブ操作しやすいようにしています。
    </p>
    <ButtonSolid
      class="mx-auto mt-8"
      label="お問い合わせ"
      size="md"
      type="common"
      @click="$emit('toggleContactFormModal', 'open')"
    />
    <ContactFormModal
      v-model:name="name"
      v-model:prefectures="prefectures"
      v-model:email="email"
      v-model:gender="gender"
      v-model:inquiry="inquiry"
      :isShow="isContactFormModal"
      :isInput="isContactFormModalStep1"
      :isConfirm="isContactFormModalStep2"
      :isComplete="isContactFormModalStep3"
      :inputData="inputData"
      :isSubmittingContactForm="isSubmittingContactForm"
      @close="$emit('toggleContactFormModal', 'close')"
      @afterLeave="$emit('resetContactFormModal')"
      @showModalStep="
        (target, data) => $emit('showContactFormModalStep', target, data)
      "
      @submitContactForm="$emit('submitContactForm')"
      @toggleAlertModal="$emit('toggleContactFormAlertModal', $event)"
    />
    <AlertMessageModal
      :isShow="isContactFormAlertModal"
      :footerButton="alertModalFooterButton"
      @back="$emit('toggleContactFormAlertModal', 'close')"
      @next="$emit('toggleContactFormModal', 'close')"
      >入力した内容が全て失われます。<br />本当に閉じますか？</AlertMessageModal
    >
  </section>
</template>
