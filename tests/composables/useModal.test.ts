import { ref } from "vue";
import { describe, expect, it } from "vitest";
import { useModal } from "~/composables/useModal";

describe("useModal の状態管理", () => {
  it("モーダルを開いたとき、渡したコンポーネントが表示される", () => {
    const { toggleModal } = useModal();
    const modal = ref(false);
    const step1 = ref(false);

    toggleModal("open", modal, step1);

    expect(modal.value).toBe(true);
    expect(step1.value).toBe(true);
  });

  it("モーダルを閉じたとき、確認モーダルも閉じる", () => {
    const { toggleModal } = useModal();
    const modal = ref(true);
    const step1 = ref(true);
    const alertModal = ref(true);

    toggleModal("close", modal, step1, alertModal);

    expect(modal.value).toBe(false);
    // NOTE: step の初期化は afterLeave で処理するためここでは検証しない
    expect(alertModal.value).toBe(false);
  });

  it("全てのステップをリセットする", () => {
    const { resetModalStep } = useModal();
    const step1 = ref(true);
    const step2 = ref(true);
    const step3 = ref(true);

    resetModalStep([step1, step2, step3]);

    expect(step1.value).toBe(false);
    expect(step2.value).toBe(false);
    expect(step3.value).toBe(false);
  });

  it("現在のステップを閉じて次のステップを表示する", () => {
    const { showModalStep } = useModal();
    const currentStep = ref(true);
    const nextStep = ref(false);

    showModalStep(currentStep, nextStep);

    expect(currentStep.value).toBe(false);
    expect(nextStep.value).toBe(true);
  });

  it("メッセージモーダルを開く", () => {
    const { toggleMessageModal } = useModal();
    const modal = ref(false);

    toggleMessageModal("open", modal);

    expect(modal.value).toBe(true);
  });

  it("メッセージモーダルを閉じるとき、メッセージを初期化する", () => {
    const { toggleMessageModal } = useModal();
    const modal = ref(true);
    const message = ref("エラーが発生しました。");

    toggleMessageModal("close", modal, message);

    expect(modal.value).toBe(false);
    expect(message.value).toBe("");
  });
});
