<script setup lang="ts">
import { errorMessages } from "~/assets/errors/errorMessages";
import type { ContactSchema as Schema } from "~/schema/contact";
import type { Prefectures, Gender, InquiryList } from "~/types/Input";
import type { ContactFormModalStep, ModalVisibility } from "~/types/Modal";
import { scrollToElementById } from "~/utils/scrollUtil";

const { sendContact } = useContactApi();
const { toggleModal, resetModalStep, showModalStep, toggleMessageModal } =
  useModal();

const { sendingErrorTryAgain } = errorMessages;

// エラーモーダル
const isErrorModal = ref<boolean>(false);
const errorModalMessage = ref<string>("");

// フォームモーダル
const isContactFormModal = ref<boolean>(false);
const isContactFormModalStep1 = ref<boolean>(false);
const isContactFormModalStep2 = ref<boolean>(false);
const isContactFormModalStep3 = ref<boolean>(false);
const isContactFormAlertModal = ref<boolean>(false);

// フォーム入力内容
const name = ref<string>("");
const prefectures = ref<(typeof Prefectures)[number] | "">("");
const email = ref<string>("");
const gender = ref<(typeof Gender)[number]>("未回答");
const inquiry = ref<(typeof InquiryList)[number][] | []>([]);

// 入力内容
const inputData = shallowRef<Schema | null>(null);

// 送信状態
const isSubmittingContactForm = ref<boolean>(false);

// メインビジュアル → ファーストセクションにスクロール
const scrollToFirstSection = (target: string) => {
  scrollToElementById(target);
};

// フォームモーダルの開閉
const toggleContactFormModal = (action: ModalVisibility): void => {
  toggleModal(
    action,
    isContactFormModal,
    isContactFormModalStep1,
    isContactFormAlertModal,
  );
};

// フォームモーダルクローズ後の状態初期化
const resetContactFormModal = (): void => {
  resetModalStep([
    isContactFormModalStep1,
    isContactFormModalStep2,
    isContactFormModalStep3,
  ]);

  name.value = "";
  prefectures.value = "";
  email.value = "";
  gender.value = "未回答";
  inquiry.value = [];

  inputData.value = null;
  isSubmittingContactForm.value = false;
};

// フォームモーダル内の遷移
const showContactFormModalStep = (
  target: ContactFormModalStep,
  data?: Schema,
): void => {
  if (target === "step1") {
    // step2 から 1 へ戻る
    showModalStep(isContactFormModalStep2, isContactFormModalStep1);
  } else if (target === "step2") {
    // step1 から 2 へ進む
    if (!data) return;
    inputData.value = data;
    showModalStep(isContactFormModalStep1, isContactFormModalStep2);
  } else {
    // step2 から 3 へ進む
    showModalStep(isContactFormModalStep2, isContactFormModalStep3);
  }
};

// コンタクトフォームモーダル用クローズ確認モーダルの開閉
const toggleContactFormAlertModal = (action: ModalVisibility): void => {
  toggleMessageModal(action, isContactFormAlertModal);
};

// フォーム入力内容送信
const submitContactForm = async (): Promise<void> => {
  if (!inputData.value || isSubmittingContactForm.value) return;

  isSubmittingContactForm.value = true;

  try {
    await sendContact(inputData.value);
    showContactFormModalStep("step3");
  } catch {
    // エラーモーダルを開く
    errorModalMessage.value = sendingErrorTryAgain;
    isContactFormModal.value = false;
    toggleErrorModal("open");
    resetContactFormModal();
  } finally {
    isSubmittingContactForm.value = false;
  }
};

const toggleErrorModal = (action: ModalVisibility): void => {
  toggleMessageModal(action, isErrorModal, errorModalMessage);
};
</script>

<template>
  <PagesTopPagesTemplate
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
    :isErrorModal="isErrorModal"
    :errorModalMessage="errorModalMessage"
    @scrollToFirstSection="scrollToFirstSection"
    @toggleContactFormModal="toggleContactFormModal"
    @resetContactFormModal="resetContactFormModal"
    @showContactFormModalStep="
      (target, data) => showContactFormModalStep(target, data)
    "
    @submitContactForm="submitContactForm"
    @toggleContactFormAlertModal="toggleContactFormAlertModal($event)"
    @toggleErrorModal="toggleErrorModal"
  />
</template>
