import type { Meta, StoryObj } from "@nuxtjs/storybook";
import CardWithImage from "@/components/parts/card/CardWithImage.vue";
import CardWrapper from "@/components/parts/card/CardWrapper.vue";

const meta = {
  title: "Component/カード",
  component: CardWithImage,
} satisfies Meta<typeof CardWithImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    title: "Card",
  },
  render: () => ({
    components: { CardWithImage, CardWrapper },
    setup() {},
    template: `
      <div class="space-y-10">
        <CardWithImage 
          v-bind="{
              title: '単体カード'
            }"
        >
          テキストテキストテキストテキスト。
        </CardWithImage>
        <CardWrapper>
          <CardWithImage 
            v-bind="{
                title: '複数カード'
              }"
          >
            テキストテキストテキストテキスト。
          </CardWithImage>
          <CardWithImage 
            v-bind="{
                title: '複数カード'
              }"
          >
            テキストテキストテキスト。<br/>
            テキストテキストテキストテキスト。
          </CardWithImage>
          <CardWithImage 
            v-bind="{
                title: '複数カード'
              }"
          >
            テキストテキストテキストテキスト。
          </CardWithImage>
        </CardWrapper>
      </div>
    `,
  }),
};
