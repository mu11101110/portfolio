import type { StoryObj } from "@nuxtjs/storybook";
import InputCheckList from "@/components/parts/input/InputCheckList.vue";
import InputRadioList from "@/components/parts/input/InputRadioList.vue";
import InputText from "@/components/parts/input/InputText.vue";
import InputSelect from "@/components/parts/input/InputSelect.vue";

const meta = {
  title: "Component/インプット",
};

export default meta;
type Story = StoryObj<typeof meta>;

// NOTE: エラー発生時の UI は storybook 上では再現できないため省略する

export const Input: Story = {
  render: () => ({
    components: { InputText, InputSelect, InputRadioList, InputCheckList },
    setup() {},
    template: `
      <dl class="space-y-10 max-w-[1020px]">

        <div class="space-y-6">
          <dt class="font-bold">テキスト入力</dt>
          <dd class="space-y-5">
            <div>
              <InputText
                v-bind="{
                  id: 'inputPlaceholder',
                  placeholder: 'プレースホルダ',
                }"
              />
            </div>
            <div>
              <InputText
                v-bind="{
                  modelValue:'テキストテキストテキストテキスト',
                  id: 'inputDescription',
                  description: 'ディスクリプション',
                }"
              />
            </div>
            <div>
              <InputText
                v-bind="{
                  modelValue:'非活性',
                  id: 'inputDisabled',
                  disabled: true
                }"
              />
            </div>
          </dd>
        </div>

        <div class="space-y-6">
          <dt class="font-bold">セレクトボックス</dt>
          <dd class="space-y-5">
            <div>
              <InputSelect
                v-bind="{
                  id: 'selectDescription',
                  options: ['選択１', '選択２', '選択３', '選択４'],
                  description: 'ディスクリプション',
                }"
              />
            </div>
            <div>
              <InputSelect
                v-bind="{
                  id: 'selectDisabled',
                  options: ['選択１', '選択２', '選択３', '選択４'],
                  disabled: true
                }"
              />
            </div>
          </dd>
        </div>

        <div class="space-y-6">
          <dt class="font-bold">ラジオボタン</dt>
          <dd class="space-y-5">
            <div>
              <InputRadioList
                v-bind="{
                  modelValue:'選択１',
                  id: 'radio1',
                  items: ['選択１', '選択２', '選択３', '選択４'],
                }"
              />
            </div>
            <div>
              <InputRadioList
                v-bind="{
                  modelValue:'選択１',
                  id: 'radio2',
                  items: ['選択１', '選択２', '選択３', '選択４'],
                  disabled: true
                }"
              />
            </div>
          </dd>
        </div>

        <div class="space-y-6">
          <dt class="font-bold">チェックリスト</dt>
          <dd class="space-y-5">
            <div>
              <InputCheckList
                v-bind="{
                  id: 'check1',
                  items: ['選択１', '選択２', '選択３', '選択４'],
                }"
              />
            </div>
            <div>
              <InputCheckList
                v-bind="{
                  modelValue:['選択１'],
                  id: 'check2',
                  items: ['選択１', '選択２', '選択３', '選択４'],
                  disabled: true
                }"
              />
            </div>
          </dd>
        </div>

      </dl>
    `,
  }),
};
