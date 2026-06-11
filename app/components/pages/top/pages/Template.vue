<script setup lang="ts">
import MainVisual from "~/components/pages/top/section/MainVisual.vue";
import About from "~/components/pages/top/section/About.vue";
import Contents from "~/components/pages/top/section/Contents.vue";
import Contact from "~/components/pages/top/section/Contact.vue";
import ErrorMessageModal from "~/components/parts/modal/ErrorMessageModal.vue";
import type { ContactSchema as Schema } from "~/schema/contact";
import type { Gender, Prefectures, InquiryList } from "~/types/Input";
import type { ContactFormModalStep, ModalVisibility } from "~/types/Modal";

defineProps<{
  inputData: Schema | null;
  isContactFormModal: boolean;
  isContactFormModalStep1: boolean;
  isContactFormModalStep2: boolean;
  isContactFormModalStep3: boolean;
  isContactFormAlertModal: boolean;
  isSubmittingContactForm: boolean;
  isErrorModal: boolean;
  errorModalMessage: string;
}>();

defineEmits<{
  scrollToFirstSection: [target: string];
  toggleContactFormModal: [type: ModalVisibility];
  resetContactFormModal: [];
  showContactFormModalStep: [target: ContactFormModalStep, data?: Schema];
  submitContactForm: [];
  toggleContactFormAlertModal: [type: ModalVisibility];
  toggleErrorModal: [type: ModalVisibility];
}>();

// メインビジュアルスクロール用 id
const firstSectionId = "FirstSection";

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
</script>

<template>
  <article>
    <MainVisual @scroll="$emit('scrollToFirstSection', firstSectionId)" />
    <div class="space-y-10">
      <About :id="firstSectionId" class="pt-10" />
      <Contents />
      <Contact
        v-model:name="name"
        v-model:prefectures="prefectures"
        v-model:email="email"
        v-model:gender="gender"
        v-model:inquiry="inquiry"
        :inputData="inputData"
        :isContactFormModal="isContactFormModal"
        :isContactFormModalStep1="isContactFormModalStep1"
        :isContactFormModalStep2="isContactFormModalStep2"
        :isContactFormModalStep3="isContactFormModalStep3"
        :isContactFormAlertModal="isContactFormAlertModal"
        :isSubmittingContactForm="isSubmittingContactForm"
        @toggleContactFormModal="$emit('toggleContactFormModal', $event)"
        @resetContactFormModal="$emit('resetContactFormModal')"
        @showContactFormModalStep="
          (target, data) => $emit('showContactFormModalStep', target, data)
        "
        @submitContactForm="$emit('submitContactForm')"
        @toggleContactFormAlertModal="
          $emit('toggleContactFormAlertModal', $event)
        "
      />
    </div>
    <ErrorMessageModal
      :isShow="isErrorModal"
      :text="errorModalMessage"
      @back="$emit('toggleErrorModal', 'close')"
    />
  </article>
</template>
