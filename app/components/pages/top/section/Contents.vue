<script setup lang="ts">
import CardWrapper from "~/components/parts/card/CardWrapper.vue";
import CardWithImage from "~/components/parts/card/CardWithImage.vue";
</script>

<template>
  <section class="section-base-px">
    <h2 class="mb-6">CONTENTS</h2>
    <CardWrapper class="lg:mx-auto">
      <CardWithImage title="フォーム導線">
        入力、確認、完了の3ステップで構成し、<br />
        バリデーションや破棄確認など、<br />
        快適に操作できる流れを意識しました。
      </CardWithImage>
      <CardWithImage title="型安全な実装">
        zod / vee-validate で入力値を検証し、<br />
        送信前にデータの妥当性を確認します。
      </CardWithImage>
      <CardWithImage title="品質確認">
        Storybook / Vitest / Playwright を<br />
        導入し、変更や意図しない挙動に<br />
        強い実装を目指しました。
      </CardWithImage>
    </CardWrapper>
  </section>
</template>
