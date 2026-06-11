import type { ModalVisibility } from "~/types/Modal";

export const useModal = () => {
  // モーダルの開閉
  const toggleModal = (
    action: ModalVisibility,
    modal: Ref<boolean>,
    step1: Ref<boolean>,
    alertModal?: Ref<boolean>,
  ): void => {
    if (action === "open") {
      step1.value = true;
      modal.value = true;
      return;
    }
    modal.value = false;
    if (alertModal?.value) alertModal.value = false;
  };

  // モーダルクローズ完了後、ステップの初期化
  const resetModalStep = (modalSteps: Ref<boolean>[]): void => {
    for (const step of modalSteps) {
      if (step.value) {
        step.value = false;
      }
    }
  };

  // モーダル内のステップ切り替え
  const showModalStep = (
    nowStep: Ref<boolean>,
    newStep: Ref<boolean>,
  ): void => {
    nowStep.value = false;
    newStep.value = true;
  };

  // メッセージモーダル（アラート/エラー）の開閉
  const toggleMessageModal = (
    action: ModalVisibility,
    modal: Ref<boolean>,
    message?: Ref<string>,
  ): void => {
    modal.value = action === "open" ? true : false;
    // メッセージモーダルを閉じる場合はメッセージを初期化する
    if (message && action === "close") message.value = "";
  };

  return {
    toggleModal,
    resetModalStep,
    showModalStep,
    toggleMessageModal,
  };
};
