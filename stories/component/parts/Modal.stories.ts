import type { StoryObj } from "@nuxtjs/storybook";
import AlertMessageModal from "@/components/parts/modal/AlertMessageModal.vue";
import ErrorMessageModal from "@/components/parts/modal/ErrorMessageModal.vue";
import DefaultModal from "@/components/parts/modal/Modal.vue";
import type { ModalFooterButton } from "@/types/Modal";

const meta = {
  title: "Component/モーダル",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  render: () => ({
    components: { DefaultModal },
    setup() {},
    template: `
      <DefaultModal
        v-bind="{
          isShow: true,
          ariaLabelledby: 'storybook-default-modal-title',
        }"
      >
        <p id="storybook-default-modal-title" class="text-center">
          テキスト<span class="font-bold">テキストテキスト</span>テキストテキストテキストテキスト<br/>
          テキストテキストテキストテキストテキストテキスト
        </p>
      </DefaultModal>
    `,
  }),
};

export const AlertModal: Story = {
  render: () => ({
    components: { AlertMessageModal },
    setup() {
      const footerButton: ModalFooterButton = {
        backButton: {
          label: "戻る",
          ariaLabel: "前の画面に戻る",
        },
        nextButton: {
          label: "閉じる",
          ariaLabel: "モーダルを閉じる",
          type: "delete",
        },
      };

      return {
        footerButton,
      };
    },
    template: `
      <AlertMessageModal
        v-bind="{
          isShow: true,
          text: 'テキストテキストテキストテキストテキストテキストテキスト',
          footerButton,
        }"
      />
    `,
  }),
};

export const ErrorModal: Story = {
  render: () => ({
    components: { ErrorMessageModal },
    setup() {},
    template: `
      <ErrorMessageModal
        v-bind="{
          isShow: true,
          text: 'テキストテキストテキストテキストテキストテキストテキスト'
        }"
      />
    `,
  }),
};
