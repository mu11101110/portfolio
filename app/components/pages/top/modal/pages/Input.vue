<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import FormItem from "~/components/parts/form/FormItem.vue";
import FormItems from "~/components/parts/form/FormItems.vue";
import InputText from "~/components/parts/input/InputText.vue";
import InputSelect from "~/components/parts/input/InputSelect.vue";
import InputRadioList from "~/components/parts/input/InputRadioList.vue";
import InputCheckList from "~/components/parts/input/InputCheckList.vue";
import FooterButton from "~/components/parts/modal/parts/ModalFooterButton.vue";
import { ContactSchema as Schema } from "~/schema/contact";
import type { ContactSchema } from "~/schema/contact";
import { Gender, Prefectures, InquiryList } from "~/types/Input";
import type { ModalFooterButton } from "~/types/Modal";
import { scrollFormError } from "~/utils/scrollUtil";

defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  close: [];
  next: [data: ContactSchema];
}>();

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(Schema),
});

// フォーム入力内容
const name = defineModel<string>("name", {
  required: true,
});
const prefectures = defineModel<(typeof Prefectures)[number] | "">(
  "prefectures",
  {
    required: true,
  },
);
const email = defineModel<string>("email", {
  required: true,
});
const gender = defineModel<(typeof Gender)[number]>("gender");
const inquiry = defineModel<(typeof InquiryList)[number][] | []>("inquiry", {
  required: true,
});

const onSubmit = handleSubmit(
  (values) => {
    emit("next", values);
  },
  () => {
    scrollFormError();
  },
);

const footerButton: ModalFooterButton = {
  backButton: {
    label: "閉じる",
    ariaLabel: "モーダルを閉じる",
  },
  nextButton: {
    label: "確認へ進む",
    ariaLabel: "入力内容の確認へ進む",
    type: "submit",
  },
};
</script>

<template>
  <h3 :id="id" class="mb-1">お問い合わせフォーム</h3>
  <p class="mb-5">
    下記をご入力の上、確認へ進むボタンを押してください。<br />
    ※実際のメール送信は行われません。
  </p>
  <form class="space-y-5" @submit.prevent="onSubmit" novalidate>
    <FormItem for="name" label="お名前" isRequire>
      <InputText
        v-model="name"
        id="name"
        placeholder="山田 太郎"
        autocomplete="name"
        isRequire
        description="フルネームでご入力ください"
      />
    </FormItem>
    <FormItem for="prefectures" label="都道府県" isRequire>
      <InputSelect
        v-model="prefectures"
        id="prefectures"
        :options="Prefectures"
        isRequire
      />
    </FormItem>
    <FormItem for="email" label="メールアドレス" isRequire>
      <InputText
        v-model="email"
        id="email"
        type="email"
        placeholder="sample@sample.co.jp"
        autocomplete="email"
        isRequire
        description="半角英数字 + 記号"
      />
    </FormItem>
    <FormItems label="性別" isRequire id="gender" :errorMessage="errors.gender">
      <InputRadioList v-model="gender" id="gender" :items="Gender" isRequire />
    </FormItems>
    <FormItems
      label="ご要件"
      isRequire
      id="inquiry"
      :errorMessage="errors.inquiry"
    >
      <InputCheckList v-model="inquiry" id="inquiry" :items="InquiryList" />
    </FormItems>
    <FooterButton :footerButton="footerButton" @back="$emit('close')" />
  </form>
</template>
