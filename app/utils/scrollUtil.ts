import { nextTick } from "vue";

export const scrollToElementById = (ID: string, duration: number = 800) => {
  const target = document.getElementById(ID);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const distanceY = targetY - startY;
  const startTime = performance.now();

  const animateScroll = (time: number) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startY + distanceY * ease);

    if (progress < 1) requestAnimationFrame(animateScroll);
  };

  requestAnimationFrame(animateScroll);
};

export const scrollFormError = () => {
  nextTick(() => {
    // バリデーションエラーが出ている要素を取得
    const error = document.querySelector<HTMLInputElement>(".valid-error");
    if (!error) return;

    // 要素のラベルにフォーカスのターゲットを決定
    const target = error.closest("fieldset") ?? error.labels?.[0];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};
