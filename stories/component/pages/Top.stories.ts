import type { Meta, StoryObj } from "@nuxtjs/storybook";
import Template from "@/components/pages/top/pages/Template.vue";

const meta = {
  title: "Pages/トップページ",
  component: Template,
  args: {
    name: "",
    prefectures: "",
    email: "",
    gender: "未回答",
    inquiry: [],
    inputData: {
      name: "名字 名前",
      prefectures: "東京都",
      email: "sample@sample.co.jp",
      gender: "女性",
      inquiry: ["要件１", "要件４"],
    },
    isContactFormModal: false,
    isContactFormModalStep1: false,
    isContactFormModalStep2: false,
    isContactFormModalStep3: false,
    isContactFormAlertModal: false,
    isSubmittingContactForm: false,
    isErrorModal: false,
    errorModalMessage: "",
  },
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof meta>;

export const トップページ: Story = {};

export const モーダル_お問い合わせ_入力: Story = {
  args: {
    isContactFormModal: true,
    isContactFormModalStep1: true,
  },
};

export const モーダル_お問い合わせ_確認: Story = {
  args: {
    isContactFormModal: true,
    isContactFormModalStep2: true,
  },
};

export const モーダル_お問い合わせ_送信中: Story = {
  args: {
    isContactFormModal: true,
    isContactFormModalStep2: true,
    isSubmittingContactForm: true,
  },
};

export const モーダル_お問い合わせ_完了: Story = {
  args: {
    isContactFormModal: true,
    isContactFormModalStep3: true,
  },
};

export const モーダル_お問い合わせ_クローズ確認: Story = {
  args: {
    ...モーダル_お問い合わせ_入力.args,
    isContactFormAlertModal: true,
  },
};

export const モーダル_エラー: Story = {
  args: {
    isErrorModal: true,
    errorModalMessage:
      "ErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorError",
  },
};
