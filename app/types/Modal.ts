import type { ButtonType } from "./Button";

export type ModalVisibility = "open" | "close";

export type ModalFooterButton = {
  backButton: {
    label: string;
    ariaLabel?: string;
    disabled?: boolean;
  };
  nextButton?: {
    label: string;
    type: ButtonType;
    ariaLabel?: string;
    confirmed?: boolean;
    disabled?: boolean;
  };
};

// モーダルのステップ（ページ番号）を生成
type Range<
  N extends number,
  Result extends number[] = [],
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

type ExcludeZero<T> = Exclude<T, 0>;

export type ContactFormModalStep = `step${ExcludeZero<Range<4>>}`;
