/**
 * ヘッダー：ハンバーガーメニューの開閉 / スクロール時の見た目変化 / 現在地ハイライト
 */
export function initHeader() {
  const header = document.querySelector('.js-header');
  const toggle = document.querySelector('.js-nav-toggle');
  const links = document.querySelectorAll('.js-nav-link');
  if (!header || !toggle) return;

  const setOpen = (isOpen) => {
    header.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  };

  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-open'));
  });

  // メニュー内のリンク選択・Escキーで閉じる
  header.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // PC幅に戻ったら開閉状態をリセット
  matchMedia('(width >= 1024px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });

  // スクロールしたらヘッダーに背景を付ける（scrollイベントを使わず監視用要素で判定）
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;width:1px;height:80px;pointer-events:none;';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting);
  }).observe(sentinel);

  // 表示中のセクションに対応するナビをハイライト
  const linkMap = new Map([...links].map((link) => [link.getAttribute('href').slice(1), link]));
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute('aria-current'));
        linkMap.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  // #top（ナビに無いセクション）も監視し、ファーストビューではハイライトを外す
  ['top', ...linkMap.keys()].forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}
