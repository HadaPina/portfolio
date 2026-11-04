/**
 * スクロールに合わせて要素をふわっと表示する
 * JS無効時は最初から表示されるよう、CSS側は html.is-js を起点に非表示にしている
 */
export function initReveal() {
  const targets = document.querySelectorAll('.js-reveal');
  if (!targets.length) return;

  document.documentElement.classList.add('is-js');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );

  targets.forEach((el) => observer.observe(el));
}
