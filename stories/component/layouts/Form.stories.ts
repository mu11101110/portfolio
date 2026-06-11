import type { StoryObj } from "@nuxtjs/storybook";
import FormItem from "@/components/parts/form/FormItem.vue";
import FooterButton from "@/components/parts/modal/parts/ModalFooterButton.vue";
import InputText from "@/components/parts/input/InputText.vue";

const meta = {
  title: "Layouts/フォーム",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: () => ({
    components: {
      FormItem,
      FooterButton,
      InputText,
    },
    setup() {},
    template: `
      <dl class="space-y-10 max-w-[1020px]">

        <div class="space-y-6">
          <dt class="font-bold">入力フォーム</dt>
          <dd class="space-y-5">
            <form class="space-y-5">
              <FormItem for="hoge" label="サンプル">
                <InputText
                  id="hoge"
                />
              </FormItem>
              <FormItem for="fuga" label="必須サンプル" isRequire>
                <InputText
                  id="fuga"
                  isRequire
                />
              </FormItem>
              <FooterButton :footerButton="
                  {
                    backButton: {
                      label: '戻る',
                      ariaLabel: '前ページへ戻る',
                    },
                    nextButton: {
                      label: '確認へ進む',
                      ariaLabel: '入力内容の確認へ進む',
                      type: 'submit',
                    },
                  }
                "
              />
            </form>
          </dd>
        </div>

        <div class="space-y-6">
          <dt class="font-bold">入力内容確認リスト</dt>
          <dd class="space-y-5">
            <dl class="input-content-list">
              <dt>サンプル</dt>
              <dd>入力内容</dd>
              <dt>サンプル</dt>
              <dd>入力内容</dd>
            </dl>
            <FooterButton :footerButton="
                {
                  backButton: {
                    label: '修正する',
                    ariaLabel: '戻って入力内容を修正する',
                  },
                  nextButton: {
                    label: '送信する',
                    ariaLabel: '現在の入力内容でメールを送信する',
                    type: 'submit',
                    confirmed: true,
                  },
                }
              "
            />
          </dd>
        </div>

        <div class="space-y-6">
          <dt class="font-bold">送信中</dt>
          <dd class="space-y-5">
            <dl class="input-content-list">
              <dt>サンプル</dt>
              <dd>入力内容</dd>
              <dt>サンプル</dt>
              <dd>入力内容</dd>
            </dl>
            <FooterButton :footerButton="
                {
                  backButton: {
                    label: '修正する',
                    ariaLabel: '戻って入力内容を修正する',
                    disabled: true,
                  },
                  nextButton: {
                    label: '送信中',
                    ariaLabel: '現在の入力内容でメールを送信する',
                    type: 'submit',
                    confirmed: true,
                    disabled: true,
                  },
                }
              "
            />
          </dd>
        </div>

        <div class="space-y-6">
          <dt class="font-bold">送信内容確認リスト</dt>
          <dd class="space-y-5">
            <dl class="input-content-list">
              <dt>サンプル</dt>
              <dd>入力内容</dd>
              <dt>サンプル</dt>
              <dd>入力内容</dd>
            </dl>
            <FooterButton :footerButton="
                {
                  backButton: {
                    label: '戻る',
                    ariaLabel: '最初の画面に戻る',
                  },
                }
              "
            />
          </dd>
        </div>

      </dl>
    `,
  }),
};
