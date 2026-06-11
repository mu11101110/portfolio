<script setup lang="ts">
import Modal from "~/components/parts/modal/Modal.vue";
import Input from "~/components/pages/top/modal/pages/Input.vue";
import Confirm from "./pages/Confirm.vue";
import Complete from "./pages/Complete.vue";
import type { ContactSchema as Schema } from "~/schema/contact";
import type { Gender, Prefectures, InquiryList } from "~/types/Input";
import type { ContactFormModalStep, ModalVisibility } from "~/types/Modal";

const {
  isShow,
  isInput,
  isConfirm,
  isComplete,
  inputData,
  isSubmittingContactForm,
} = defineProps<{
  isShow: boolean;
  isInput: boolean;
  isConfirm: boolean;
  isComplete: boolean;
  inputData: Schema | null;
  isSubmittingContactForm: boolean;
}>();

const emit = defineEmits<{
  close: [];
  afterLeave: [];
  showModalStep: [target: ContactFormModalStep, data?: Schema];
  submitContactForm: [];
  toggleAlertModal: [action: ModalVisibility];
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

const modalTitleIds = {
  input: "contact-form-modal-input-title",
  confirm: "contact-form-modal-confirm-title",
  complete: "contact-form-modal-complete-title",
} as const;

const modalTitleId = computed(() => {
  if (isInput) return modalTitleIds.input;
  if (isConfirm) return modalTitleIds.confirm;
  if (isComplete) return modalTitleIds.complete;
  return undefined;
});

// 表示されている step に応じてモーダルを閉じる際のイベントを切り替える
const closeModal = () => {
  if (isSubmittingContactForm) return;

  if (isInput || isConfirm) {
    return emit("toggleAlertModal", "open");
  }
  emit("close");
};
</script>

<template>
  <Modal
    :isShow="isShow"
    :isSubmitting="isSubmittingContactForm"
    :ariaLabelledby="modalTitleId"
    @close="closeModal"
    @afterLeave="$emit('afterLeave')"
  >
    <Input
      v-if="isInput"
      :id="modalTitleIds.input"
      v-model:name="name"
      v-model:prefectures="prefectures"
      v-model:email="email"
      v-model:gender="gender"
      v-model:inquiry="inquiry"
      @close="closeModal"
      @next="(data) => $emit('showModalStep', 'step2', data)"
    />
    <Confirm
      v-if="isConfirm && inputData"
      :id="modalTitleIds.confirm"
      :inputData="inputData"
      :isSubmitting="isSubmittingContactForm"
      @back="$emit('showModalStep', 'step1')"
      @next="$emit('submitContactForm')"
    />
    <Complete
      v-if="isComplete && inputData"
      :id="modalTitleIds.complete"
      :inputData="inputData"
      @close="$emit('close')"
    />
  </Modal>
</template>
