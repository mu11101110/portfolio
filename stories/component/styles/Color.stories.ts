import type { StoryObj } from "@nuxtjs/storybook";

const meta = {
  title: "Styles/カラー",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {
  render: () => ({
    setup() {},
    template: `
      <dl class="space-y-6">
        <div>
          <dt class="font-bold">プライマリー</dt>
          <dd>
            <p class="text-primary-light font-bold">primary-light</p>
            <p class="text-primary font-bold">primary</p>
            <p class="text-primary-dark font-bold">primary-dark</p>
          </dd>
        </div>
        <div>
          <dt class="font-bold">セカンダリー</dt>
          <dd>
            <p class="text-secondary-light font-bold">secondary-light</p>
            <p class="text-secondary font-bold">secondary</p>
            <p class="text-secondary-dark font-bold">secondary-dark</p>
          </dd>
        </div>
        <div>
          <dt class="font-bold">サーダリー</dt>
          <dd>
            <p class="text-thirdly-light font-bold">thirdly-light</p>
            <p class="text-thirdly font-bold">thirdly</p>
            <p class="text-thirdly-dark font-bold">thirdly-dark</p>
          </dd>
        </div>
        <div>
          <dt class="font-bold">サーフェス</dt>
          <dd>
            <p class="text-surface-white font-bold">surface-white</p>
            <p class="text-surface-disabled font-bold">surface-disabled</p>
            <p class="text-surface-background bg-gray-500 font-bold inline-block">surface-background</p>
          </dd>
        </div>
        <div>
          <dt class="font-bold">テキスト</dt>
          <dd>
            <p class="text-text-light font-bold">text-light</p>
            <p class="text-text font-bold">text</p>
          </dd>
        </div>
        <div>
          <dt class="font-bold">ハイライト</dt>
          <dd>
            <p class="text-highlight-error font-bold">text-highlight-error</p>
            <p class="text-highlight-yellow font-bold">text-highlight-yellow</p>
          </dd>
        </div>
      </dl>
    `,
  }),
};
