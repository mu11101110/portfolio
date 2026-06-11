import { describe, expect, it } from "vitest";
import { validMessages } from "~/assets/errors/validMessages";
import { ContactSchema } from "~/schema/contact";

const validContactData = {
  name: "山田 太郎",
  prefectures: "東京都",
  email: "sample@sample.com",
  gender: "未回答",
  inquiry: ["要件１"],
};

describe("ContactSchema のバリデーション", () => {
  it("有効な入力を受け付ける", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
    });

    expect(result.success).toBe(true);
  });
});

describe("名前 のバリデーション", () => {
  it("未入力の場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      name: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain(
        validMessages.requiredInput,
      );
    }
  });

  it("空白の場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      name: " ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain(
        validMessages.requiredInput,
      );
    }
  });
});

describe("都道府県 のバリデーション", () => {
  it("未選択の場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      prefectures: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.prefectures).toContain(
        validMessages.requiredInput,
      );
    }
  });

  it("選択肢以外が入力された場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      prefectures: "テスト",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.prefectures).toContain(
        validMessages.requiredChoice,
      );
    }
  });
});

describe("メール のバリデーション", () => {
  it("前後の空白を削除する", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      email: " sample@example.com ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("sample@example.com");
    }
  });

  it("未入力の場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      email: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain(
        validMessages.requiredInput,
      );
    }
  });

  it("メールアドレスの形式が不正な場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      email: "test",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain(
        validMessages.correctEmailFormat,
      );
    }
  });
});

describe("性別 のバリデーション", () => {
  it("選択肢以外が入力された場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      gender: "テスト",
    });

    expect(result.success).toBe(false);
  });
});

describe("問い合わせ内容 のバリデーション", () => {
  it("未選択の場合はエラーにする", () => {
    const result = ContactSchema.safeParse({
      ...validContactData,
      inquiry: [],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.inquiry).toContain(
        validMessages.requiredInput,
      );
    }
  });
});
