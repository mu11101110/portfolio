import { expect, test } from "@playwright/test";

const activeElementIsInside = (
  dialog: ReturnType<import("@playwright/test").Page["getByRole"]>,
) => dialog.evaluate((element) => element.contains(document.activeElement));

test("モーダルが開いている間、フォーカスをモーダル内に閉じ込める", async ({
  page,
}) => {
  await page.goto("/");

  const contactDialog = page.getByRole("dialog").first();

  await expect(async () => {
    await page.getByRole("button", { name: "お問い合わせ" }).click();
    await expect(contactDialog).toBeVisible();
  }).toPass();

  await expect.poll(() => activeElementIsInside(contactDialog)).toBe(true);

  await page.keyboard.press("Shift+Tab");
  await expect.poll(() => activeElementIsInside(contactDialog)).toBe(true);

  await contactDialog.getByRole("button").first().click();

  const alertDialog = page.getByRole("dialog").last();
  await expect(alertDialog).toBeVisible();
  await expect.poll(() => activeElementIsInside(alertDialog)).toBe(true);

  await page.keyboard.press("Shift+Tab");
  await expect.poll(() => activeElementIsInside(alertDialog)).toBe(true);
});

test("Esc キーで入力モーダルの破棄確認を開き、破棄確認を Esc キーで閉じる", async ({
  page,
}) => {
  await page.goto("/");

  const dialogs = page.getByRole("dialog");
  const contactDialog = dialogs.first();

  await expect(async () => {
    await page.getByRole("button", { name: "お問い合わせ" }).click();
    await expect(contactDialog).toBeVisible();
  }).toPass();

  await page.keyboard.press("Escape");

  const alertDialog = dialogs.last();
  await expect(dialogs).toHaveCount(2);
  await expect(contactDialog).toBeVisible();
  await expect(alertDialog).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(dialogs).toHaveCount(1);
  await expect(contactDialog).toBeVisible();
});
