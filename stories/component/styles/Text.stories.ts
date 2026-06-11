import type { StoryObj } from "@nuxtjs/storybook";
import ExternalLinkText from "@/components/parts/link/ExternalLinkText.vue";

const meta = {
  title: "Styles/テキスト",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => ({
    components: { ExternalLinkText },
    setup() {},
    template: `
      <dl class="space-y-10">
        <div>
          <dt class="font-bold mb-4">タイトル</dt>
          <dd>
            <h2>H2タイトル</h2>
            <h3>H3タイトル</h3>
          </dd>
        </div>
        <div>
          <dt class="font-bold mb-4">テキスト</dt>
          <dd class="space-y-3">
            <p class="text-sm">14px Regular</p>
            <p class="text-sm font-bold">14px Bold</p>
            <p class="text-base">16px Regular</p>
            <p class="text-base font-bold">16px Bold</p>
            <p class="text-lg">18px Regular</p>
            <p class="text-lg font-bold">18px Bold</p>
            <p class="text-xl">20px Regular</p>
            <p class="text-xl font-bold">20px Bold</p>
            <p class="text-2xl">24px Regular</p>
            <p class="text-2xl font-bold">24px Bold</p>
          </dd>
        </div>
        <div>
          <dt class="font-bold mb-4">リンク</dt>
          <dd class="space-y-3">
            <p>
              <a>
                通常リンクテキスト
              </a>
            </p>
            <p>
              <ExternalLinkText
                v-bind="{
                  url: '',
                  label: '外部リンクテキスト'
                }"
              />
            </p>
          </dd>
        </div>
      </dl>
    `,
  }),
};
