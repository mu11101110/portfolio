import type { Meta, StoryObj } from "@nuxtjs/storybook";
import ButtonText from "@/components/parts/button/ButtonText.vue";
import ButtonSolid from "@/components/parts/button/ButtonSolid.vue";
import ButtonBase from "@/components/parts/button/parts/ButtonBase.vue";
import ButtonOutline from "@/components/parts/button/ButtonOutline.vue";

const meta = {
  title: "Component/ボタン",
  component: ButtonBase,
} satisfies Meta<typeof ButtonBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    label: "Button",
    size: "md",
  },
  render: () => ({
    components: { ButtonOutline, ButtonSolid, ButtonText },
    setup() {},
    template: `
      <dl class="space-y-6">
        <dt class="font-bold">背景色ありボタン</dt>
        <dd class="space-y-3">
          <div class="flex items-center flex-wrap gap-4">
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'sm',
                type: 'common',
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'md',
                type: 'common',
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'lg',
                type: 'common',
              }"
            />
          </div>
          <div class="flex items-center flex-wrap gap-4">
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'sm',
                type: 'submit',
                confirmed: true,
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'md',
                type: 'submit',
                confirmed: true,
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'lg',
                type: 'submit',
                confirmed: true,
              }"
            />
          </div>
          <div class="flex items-center flex-wrap gap-4">
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'sm',
                type: 'delete',
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'md',
                type: 'delete',
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'lg',
                type: 'delete',
              }"
            />
          </div>
          <div class="flex items-center flex-wrap gap-4">
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'sm',
                type: 'common',
                disabled: true
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'md',
                type: 'common',
                disabled: true
              }"
            />
            <ButtonSolid
              v-bind="{
                label: 'ボタン',
                size: 'lg',
                type: 'common',
                disabled: true
              }"
            />
          </div>
        </dd>
        <dt class="font-bold">アウトラインボタン</dt>
        <dd class="space-y-3">
          <div class="flex items-center flex-wrap gap-4">
            <ButtonOutline
              v-bind="{
                label: 'ボタン',
                size: 'sm',
              }"
            />
            <ButtonOutline
              v-bind="{
                label: 'ボタン',
                size: 'md',
                type: 'common',
              }"
            />
            <ButtonOutline
              v-bind="{
                label: 'ボタン',
                size: 'lg',
                type: 'common',
              }"
            />
          </div>
          <div class="flex items-center flex-wrap gap-4">
            <ButtonOutline
              v-bind="{
                label: 'ボタン',
                size: 'sm',
                disabled: true
              }"
            />
            <ButtonOutline
              v-bind="{
                label: 'ボタン',
                size: 'md',
                type: 'common',
                disabled: true
              }"
            />
            <ButtonOutline
              v-bind="{
                label: 'ボタン',
                size: 'lg',
                type: 'common',
                disabled: true
              }"
            />
          </div>
        </dd>
        <dt class="font-bold">テキストボタン</dt>
        <dd class="flex items-center gap-4">
          <ButtonText
            v-bind="{
              label: 'ボタン',
            }"
          />
          <ButtonText
            v-bind="{
              label: 'ボタン',
              disabled: true,
            }"
          />
        </dd>
      </dl>
    `,
  }),
};
