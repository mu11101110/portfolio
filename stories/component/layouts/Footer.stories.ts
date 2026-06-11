import type { Meta, StoryObj } from "@nuxtjs/storybook";
import Footer from "@/components/layouts/Footer.vue";

const meta = {
  title: "Layouts/フッター",
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const フッター: Story = {};
