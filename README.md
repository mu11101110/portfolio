# UI Implementation Portfolio

Nuxt 4 / Vue 3 / TypeScript で制作した、問い合わせフォームを中心とした UI 実装ポートフォリオです。
フォーム入力から送信までの導線に加え、バリデーション、モーダル操作、Storybook、Vitest / Playwright による品質確認を実装しています。

## URL

- デモURL：[URL](https://portfolio-red-nine-ua3h72d7id.vercel.app/)
- GitHub：[URL](https://github.com/mu11101110/portfolio)
- Storybook：[URL](https://storybook-flax-five.vercel.app/)
- Figma：[URL](https://www.figma.com/design/EPcFOqWRDp1c0j5BhdtL21/Sample-Figma)

## 制作目的

フォーム導線、アクセシビリティ、テスト観点を含めたフロントエンド実装力を確認できるように制作しました。
そのため、本文や一部リンク、画像はダミーとして配置しています。

## 主な機能

- レスポンシブ対応
- お問い合わせフォームモーダル
  - 入力、確認、完了の3ステップ構成
  - 入力内容破棄前の確認モーダル
  - モーダル内にフォーカスを保持する focus trap
  - Esc キーによるモーダル操作
  - zod schema による必須入力、入力形式、選択肢のバリデーション
  - 入力エラー発生時の該当項目へのスクロール
  - 送信中の二重送信防止と送信失敗時のエラー表示
  - モック API への送信
    - 送信失敗表示の確認
    - 実際のメール送信処理はなし
- Storybook によるコンポーネント表示確認

## 使用技術

| Category         | Stack              |
| ---------------- | ------------------ |
| Framework        | Nuxt 4, Vue 3      |
| Language         | TypeScript         |
| Styling          | Tailwind CSS       |
| Form             | vee-validate, zod  |
| Test             | Vitest, Playwright |
| Lint / Typecheck | ESLint, vue-tsc    |
| UI Catalog       | Storybook          |
| Package Manager  | pnpm               |

## セットアップ

```bash
pnpm install
```

## 開発サーバー

```bash
pnpm dev
```

`http://localhost:3000` で確認できます。

## Storybook

```bash
pnpm storybook
```

`http://localhost:6006` で確認できます。

## ビルド

```bash
pnpm build
```

```bash
pnpm build-storybook
```

## 品質確認

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm build-storybook
```

まとめて確認する場合:

```bash
pnpm check
```

## ディレクトリ構成

```text
app/
  assets/
    css/
    errors/
    images/
  components/
    layouts/
    pages/
    parts/
  composables/
  layouts/
  pages/
  schema/
  types/
  utils/
stories/
  component/
tests/
  composables/
  e2e/
  schema/
```

## 実装のポイント

### 設計意図

フォームの入力から送信完了までを一つの UI として扱い、ユーザーが迷わず操作できる導線を意識して設計しました。
単に画面を表示するだけでなく、入力、確認、送信、送信失敗、破棄確認を分けて管理し、それぞれの状態で必要な操作だけを行えるようにしています。

入力時の値と送信用データは分けて管理しています。
確認画面へ進むタイミングで検証済みの値を別のデータとして保持し、確実に検証された値を送信処理に使用するようにしています。
これにより、確認画面から入力画面へ戻った場合は入力中の値を維持しつつ、送信時には検証済みのデータだけを扱えるようにしています。

モーダルはアクセシビリティと操作中の安全性を重視しています。
`aria-labelledby`、`aria-modal`、focus trap を設定し、キーボード操作でもモーダル内で完結できるようにしました。
また、送信中は画面操作を抑制し、二重送信や処理中の誤操作を防ぐ設計にしています。

### コンポーネント設計

画面固有のコンポーネントと共通で使用するコンポーネントは分けて管理しています。

- `components/pages`: ページ単位、セクション単位のコンポーネント
- `components/parts`: ボタン、入力、モーダル、カードなどの共通コンポーネント
- `components/layouts`: フッターなどのレイアウト部品

### フォームバリデーション

フォームのルールは `app/schema/contact.ts` に集約しています。
zod の schema を vee-validate に渡すことで、入力値の検証と TypeScript の型を近い場所で管理しています。

### モーダルの状態管理

お問い合わせフォームは入力、確認、完了の3ステップで構成しています。
モーダルの開閉やステップの切り替えは composable に切り出し、再利用可能にしています。

### モック API

確認画面の送信ボタンから `server/api/contact.post.ts` に POST しています。
成功時は受付 ID と送信日時を返します。
メールアドレスに `test@error.com` を入力すると、送信失敗時のエラー表示を確認できます。

### 単体テスト

Vitest でフォームバリデーション schema とモーダル用 composable のテストを実装しています。

### E2E テスト

Playwright でお問い合わせフォームの入力、確認、送信完了までのフローと、モーダルの focus trap / Esc キー操作を確認しています。

初回のみ Playwright 用ブラウザをインストールしてください。

```bash
pnpm exec playwright install chromium
```

### Storybook

各コンポーネントの表示と操作性は Storybook で確認できるようにしています。
VRT 導入も見据え、ページ全体の story も用意しています。
