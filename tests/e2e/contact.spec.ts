import { expect, test } from "@playwright/test";

const input = {
  name: "山田 太郎",
  prefectures: "東京都",
  email: "sample@example.com",
  gender: "女性",
  inquiry: ["要件１", "要件４"],
} as const;

const alertDialogText = /入力した内容が全て失われます/;
const errorDialogText = /送信に失敗しました/;
const mockFailureEmail = "test@error.com";

const openModal = async (page: import("@playwright/test").Page) => {
  await page.goto("/");

  const inputDialog = page.getByRole("dialog", {
    name: "お問い合わせフォーム",
  });

  await expect(async () => {
    await page.getByRole("button", { name: "お問い合わせ" }).click();
    await expect(inputDialog).toBeVisible();
  }).toPass();

  return inputDialog;
};

const fillForm = async (
  page: import("@playwright/test").Page,
  options: {
    email?: string;
    inquiry?: readonly string[];
  } = {},
) => {
  await page.getByLabel("お名前").fill(input.name);
  await page.getByLabel("都道府県").selectOption(input.prefectures);
  await page.getByLabel("メールアドレス").fill(options.email ?? input.email);
  await page.getByLabel(input.gender).check();

  for (const item of options.inquiry ?? input.inquiry) {
    await page.getByLabel(item).check();
  }
};

const goToConfirm = async (page: import("@playwright/test").Page) => {
  await page.getByRole("button", { name: "入力内容の確認へ進む" }).click();

  const confirmDialog = page.getByRole("dialog", { name: "入力内容確認" });
  await expect(confirmDialog).toBeVisible();

  return confirmDialog;
};

const assertConfirmData = async (
  confirmDialog: ReturnType<import("@playwright/test").Page["getByRole"]>,
  inquiryText = input.inquiry.join(", "),
) => {
  await expect(confirmDialog.getByText(input.name)).toBeVisible();
  await expect(confirmDialog.getByText(input.prefectures)).toBeVisible();
  await expect(confirmDialog.getByText(input.email)).toBeVisible();
  await expect(confirmDialog.getByText(input.gender)).toBeVisible();
  await expect(confirmDialog.getByText(inquiryText)).toBeVisible();
};

const clickCloseButton = async (
  dialog: ReturnType<import("@playwright/test").Page["getByRole"]>,
) => {
  await dialog
    .getByRole("button", { name: "モーダルを閉じる" })
    .first()
    .click();
};

test("フォームを入力して送信完了する", async ({ page }) => {
  await openModal(page);
  await fillForm(page);

  const confirmDialog = await goToConfirm(page);
  await assertConfirmData(confirmDialog);

  await page
    .getByRole("button", { name: "現在の入力内容でメールを送信する" })
    .click();
  await expect(
    page.getByRole("button", { name: "現在の入力内容でメールを送信する" }),
  ).toBeDisabled();

  const completeDialog = page.getByRole("dialog", {
    name: "送信が完了しました",
  });
  await expect(completeDialog).toBeVisible();

  await clickCloseButton(completeDialog);

  await expect(page.getByRole("dialog", { name: alertDialogText })).toHaveCount(
    0,
  );
  await expect(completeDialog).toBeHidden();
});

test("送信失敗時、エラーモーダルを表示する", async ({ page }) => {
  await openModal(page);
  await fillForm(page, { email: mockFailureEmail });

  const confirmDialog = await goToConfirm(page);
  await expect(confirmDialog.getByText(mockFailureEmail)).toBeVisible();

  await page
    .getByRole("button", { name: "現在の入力内容でメールを送信する" })
    .click();

  const errorDialog = page.getByRole("dialog", { name: errorDialogText });
  await expect(errorDialog).toBeVisible();
  await expect(page.getByRole("dialog", { name: "入力内容確認" })).toHaveCount(
    0,
  );
});

test("入力画面で閉じようとするとアラートモーダルが表示され、破棄するとすべて閉じる", async ({
  page,
}) => {
  const inputDialog = await openModal(page);

  await clickCloseButton(inputDialog);

  const alertDialog = page.getByRole("dialog", { name: alertDialogText });
  await expect(alertDialog).toBeVisible();

  await alertDialog
    .getByRole("button", { name: "入力を破棄して閉じる" })
    .click();

  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("確認画面で閉じようとするとアラートモーダルが表示され、破棄するとすべて閉じる", async ({
  page,
}) => {
  await openModal(page);
  await fillForm(page);
  const confirmDialog = await goToConfirm(page);

  await clickCloseButton(confirmDialog);

  const alertDialog = page.getByRole("dialog", { name: alertDialogText });
  await expect(alertDialog).toBeVisible();

  await alertDialog
    .getByRole("button", { name: "入力を破棄して閉じる" })
    .click();

  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("確認画面から戻ると入力値が復元されている", async ({ page }) => {
  await openModal(page);
  await fillForm(page);
  await goToConfirm(page);

  await page.getByRole("button", { name: "戻って入力内容を修正する" }).click();

  await expect(
    page.getByRole("dialog", { name: "お問い合わせフォーム" }),
  ).toBeVisible();
  await expect(page.getByLabel("お名前")).toHaveValue(input.name);
  await expect(page.getByLabel("都道府県")).toHaveValue(input.prefectures);
  await expect(page.getByLabel("メールアドレス")).toHaveValue(input.email);
  await expect(page.getByLabel(input.gender)).toBeChecked();
  await expect(page.getByLabel("要件１")).toBeChecked();
  await expect(page.getByLabel("要件４")).toBeChecked();
});

test("チェックリストをランダムに選択しても確認画面では昇順で表示される", async ({
  page,
}) => {
  await openModal(page);
  await fillForm(page, { inquiry: ["要件４", "要件１"] });

  const confirmDialog = await goToConfirm(page);

  await expect(confirmDialog.getByText("要件１, 要件４")).toBeVisible();
});
