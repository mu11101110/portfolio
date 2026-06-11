import type { Meta, StoryObj } from "@nuxtjs/storybook";
import LogoImage from "@/components/parts/logo/LogoImage.vue";
import LogoText from "@/components/parts/logo/LogoText.vue";

const meta = {
  title: "Images/ロゴ",
  component: LogoImage,
} satisfies Meta<typeof LogoImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logo: Story = {
  render: () => ({
    components: { LogoImage, LogoText },
    setup() {},
    template: `
      <dl class="space-y-6">
        <dt class="font-bold">ロゴ画像</dt>
        <dd class="bg-gray-400 inline-block p-2">
          <LogoImage />
        </dd>
        <dt class="font-bold">テキストロゴ</dt>
        <dd>
          <LogoText />
        </dd>
      </dl>
    `,
  }),
};
