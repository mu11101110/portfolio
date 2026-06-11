<script setup lang="ts">
import type { ContactSchema as Schema } from "~/schema/contact";

defineProps<{
  data: Schema;
}>();
</script>

<template>
  <dl class="input-content-list">
    <dt>お名前</dt>
    <dd>{{ data.name }}</dd>
    <dt>都道府県</dt>
    <dd>{{ data.prefectures }}</dd>
    <dt>メールアドレス</dt>
    <dd>{{ data.email }}</dd>
    <dt>性別</dt>
    <dd>{{ data.gender }}</dd>
    <dt>ご要件</dt>
    <dd>{{ data.inquiry.join(", ") }}</dd>
  </dl>
</template>
