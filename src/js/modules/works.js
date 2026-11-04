import { works } from '../data/works.js';

/**
 * 制作実績：ギャラリー / 一覧カード / 詳細モーダル を描画する
 */

const IMAGE_DIR = 'images/works';

// データをHTMLに埋め込む際のエスケープ（XSS対策の基本として）
const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (c) => ESCAPE_MAP[c]);

const hostOf = (url) => new URL(url).host;

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------
// Device frames（PC はブラウザ枠、SP はスマホ枠で表示）
// ---------------------------------------------------------
const browserTemplate = (page, { eager = false } = {}) => `
  <span class="c-browser">
    <span class="c-browser__bar" aria-hidden="true">
      <span class="c-browser__dots"></span>
      <span class="c-browser__url">${escapeHtml(hostOf(page.url))}</span>
    </span>
    <img class="c-browser__img" src="${IMAGE_DIR}/${escapeHtml(page.image)}.webp" alt="${escapeHtml(page.label)}のPC表示"
      width="1280" height="800" ${eager ? '' : 'loading="lazy"'} decoding="async">
  </span>`;

const phoneTemplate = (page) => `
  <span class="c-phone">
    <img class="c-phone__img" src="${IMAGE_DIR}/${escapeHtml(page.image)}-sp.webp" alt="${escapeHtml(page.label)}のスマホ表示"
      width="390" height="780" loading="lazy" decoding="async">
  </span>`;

// ---------------------------------------------------------
// Marquee：全制作物のスクリーンショットを流す
// ---------------------------------------------------------
function renderMarquee() {
  const marquee = document.querySelector('.js-works-marquee');
  if (!marquee) return;

  const pages = works.flatMap((w) => w.pages).filter((page) => page.marquee !== false);
  const items = pages
    .map(
      (page) => `
      <li class="p-works__marquee-item">
        <img src="${IMAGE_DIR}/${escapeHtml(page.image)}.webp" alt="" width="1280" height="800" loading="lazy" decoding="async">
      </li>`,
    )
    .join('');

  // 同じ列を2つ並べ、-50% 移動させることで継ぎ目のないループにする
  marquee.innerHTML = `<ul class="p-works__marquee-track">${items}${items}</ul>`;
}

// ---------------------------------------------------------
// 一覧カード
// ---------------------------------------------------------
const visualTemplate = (work) => {
  const [main, sub] = work.pages;
  const spPage = work.pages.find((p) => p.sp);
  // カードの高さが変わってもコラージュが間延びしないよう、比率固定の枠に入れて中央に置く
  return `
    <span class="p-works__collage">
      <span class="p-works__shot p-works__shot--main">${browserTemplate(main)}</span>
      ${sub ? `<span class="p-works__shot p-works__shot--sub">${browserTemplate(sub)}</span>` : ''}
      ${spPage ? `<span class="p-works__shot p-works__shot--phone">${phoneTemplate(spPage)}</span>` : ''}
    </span>`;
};

// データ内の改行（\n）を <br> にして表示する
const withBreaks = (text) => escapeHtml(text).replaceAll('\n', '<br>');

// 成果は「何が（label）→ どうなった（value + unit）」の順で読ませる
const valueTemplate = (result) =>
  `${escapeHtml(result.value)}${result.unit ? `<span>${escapeHtml(result.unit)}</span>` : ''}`;

// 一覧カードから各ページへ直接飛べるリンクボタン
const pageLinkTemplate = (page) => `
  <li>
    <a class="c-button c-button--small c-button--ghost" href="${escapeHtml(page.url)}" target="_blank" rel="noopener">
      ${escapeHtml(page.label)}
      <svg class="c-button__icon" aria-hidden="true"><use href="#icon-external"></use></svg>
      <span class="u-visually-hidden">（新しいタブで開きます）</span>
    </a>
  </li>`;

// 一覧カードは簡潔に：ひと言 → 担当範囲・制作期間 → タグ → 各ページへのリンク
const cardTemplate = (work) => `
  <li class="p-works__item js-reveal">
    <article class="p-works__card">
      <div class="p-works__visual${work.pages[1] ? '' : ' p-works__visual--single'}">${visualTemplate(work)}</div>

      <div class="p-works__body">
        <p class="p-works__meta">
          <span class="p-works__no">Project ${escapeHtml(work.no)}</span>
        </p>
        <h3 class="p-works__title">${escapeHtml(work.title)}</h3>

        <p class="p-works__headline">${escapeHtml(work.summary)}</p>

        <p class="p-works__spec">
          <span><b>担当範囲</b>${escapeHtml(work.role)}</span>
          <span><b>制作期間</b>${escapeHtml(work.period)}</span>
        </p>

        <ul class="p-works__tags" aria-label="キーワード">${work.tags.map((t) => `<li class="p-works__tag">${escapeHtml(t)}</li>`).join('')}</ul>

        <div class="p-works__footer">
          <ul class="p-works__links" aria-label="${escapeHtml(work.shortTitle)}の公開ページ">
            ${work.pages.map(pageLinkTemplate).join('')}
          </ul>
          <button class="c-button c-button--small p-works__more" type="button" data-id="${escapeHtml(work.id)}" aria-haspopup="dialog">
            詳しく見る<span class="u-visually-hidden">：${escapeHtml(work.shortTitle)}</span>
            <svg class="c-button__icon" aria-hidden="true"><use href="#icon-arrow"></use></svg>
          </button>
        </div>
      </div>
    </article>
  </li>`;

// ---------------------------------------------------------
// 詳細モーダル
// 構成：成果（ひと言 + 数字）→ この成果に至るまで（背景〜実施内容・+α）→ 制作ページ
// ---------------------------------------------------------
const pageCardTemplate = (page, index) => `
  <li class="c-modal__page">
    <a class="c-modal__page-link" href="${escapeHtml(page.url)}" target="_blank" rel="noopener">
      <span class="c-modal__page-visual${page.sp ? ' c-modal__page-visual--sp' : ''}">
        ${browserTemplate(page, { eager: index === 0 })}
        ${page.sp ? phoneTemplate(page) : ''}
      </span>
      <span class="c-modal__page-body">
        <span class="c-modal__page-label">${escapeHtml(page.label)}</span>
        <span class="c-modal__page-desc">${escapeHtml(page.description)}</span>
        <span class="c-modal__page-url">
          ${escapeHtml(hostOf(page.url))}
          <svg aria-hidden="true"><use href="#icon-external"></use></svg>
          <span class="u-visually-hidden">（新しいタブで開きます）</span>
        </span>
      </span>
    </a>
  </li>`;

const pagerTemplate = (work) => {
  const index = works.indexOf(work);
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];
  return `
    <nav class="c-modal__pager" aria-label="ほかの実績">
      <button class="c-modal__pager-btn c-modal__pager-btn--prev" type="button" data-goto="${escapeHtml(prev.id)}">
        <span class="c-modal__pager-dir">Prev</span>
        <span class="c-modal__pager-title">${escapeHtml(prev.shortTitle)}</span>
      </button>
      <button class="c-modal__pager-btn c-modal__pager-btn--next" type="button" data-goto="${escapeHtml(next.id)}">
        <span class="c-modal__pager-dir">Next</span>
        <span class="c-modal__pager-title">${escapeHtml(next.shortTitle)}</span>
      </button>
    </nav>`;
};

const modalTemplate = (work) => `
  <header class="c-modal__header">
    <p class="c-modal__meta">
      <span class="c-modal__no">Project ${escapeHtml(work.no)}</span>
    </p>
    <h2 class="c-modal__title" id="modal-title">${escapeHtml(work.title)}</h2>
    <ul class="c-modal__tags">${work.tags.map((t) => `<li class="c-tag">${escapeHtml(t)}</li>`).join('')}</ul>
  </header>

  <section class="c-modal__result" aria-labelledby="modal-result-title">
    <h3 class="c-modal__label" id="modal-result-title">Result<span>成果</span></h3>
    <p class="c-modal__headline">${escapeHtml(work.headline)}</p>
    <ul class="c-modal__metrics">
      ${work.results
        .map(
          (r) => `
        <li class="c-modal__metric">
          <span class="c-modal__metric-label">${escapeHtml(r.label)}</span>
          <strong class="c-modal__metric-value">${valueTemplate(r)}</strong>
          ${r.note ? `<span class="c-modal__metric-note">${escapeHtml(r.note)}</span>` : ''}
        </li>`,
        )
        .join('')}
    </ul>
  </section>

  <section class="c-modal__process" aria-label="背景と取り組み">
    <dl class="c-modal__detail">
      <div><dt>背景</dt><dd>${withBreaks(work.background)}</dd></div>
      <div><dt>目的</dt><dd>${escapeHtml(work.purpose)}</dd></div>
      <div><dt>担当範囲</dt><dd>${escapeHtml(work.role)}</dd></div>
      <div><dt>制作期間</dt><dd>${escapeHtml(work.period)}</dd></div>
      <div><dt>実施内容</dt><dd><ul>${work.actions.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}</ul></dd></div>
    </dl>

    <div class="c-modal__plus">
      <p class="c-modal__plus-label">+α Point</p>
      <p>${withBreaks(work.plusAlpha)}</p>
    </div>
  </section>

  <section class="c-modal__pages" aria-labelledby="modal-pages-title">
    <h3 class="c-modal__pages-title" id="modal-pages-title">制作したページ<span>${work.pages.length}</span></h3>
    <ul class="c-modal__pages-list${work.pages.length === 1 ? ' c-modal__pages-list--single' : ''}">
      ${work.pages.map(pageCardTemplate).join('')}
    </ul>
  </section>

  ${work.note ? `<p class="c-modal__note">${escapeHtml(work.note)}</p>` : ''}

  ${pagerTemplate(work)}`;

function initModal(list) {
  const modal = document.querySelector('.js-modal');
  const content = document.querySelector('.js-modal-content');
  const barTitle = document.querySelector('.js-modal-bar-title');
  const closeBtn = document.querySelector('.js-modal-close');
  if (!modal || !content) return;

  let opener = null;

  const render = (id) => {
    const work = works.find((w) => w.id === id);
    if (!work) return;
    content.innerHTML = modalTemplate(work);
    if (barTitle) barTitle.textContent = work.shortTitle;
    content.scrollTop = 0;
  };

  // カードのどこをクリックしても開く（キーボード操作はカード内のボタンで受ける）
  // ただし各ページへのリンクはモーダルを開かず、そのままサイトへ遷移させる
  list.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const trigger = e.target.closest('.p-works__card')?.querySelector('[data-id]');
    if (!trigger) return;
    opener = trigger;
    render(trigger.dataset.id);
    // フォーカストラップ・Escで閉じる・背面の不活性化は <dialog> の標準機能に任せる
    modal.showModal();
    // 閉じるボタンに枠が出ないよう本文にフォーカス（スクロール位置は先頭のまま）
    content.focus({ preventScroll: true });
    content.scrollTop = 0;
  });

  // モーダル内の Prev / Next で実績を切り替え
  // ページ全体の View Transition を使うと、view-transition-name を持つ一覧カードが
  // 一瞬モーダルの上に描画されてしまうため、モーダルの本文だけを Web Animations API でフェードさせる
  let switching = false;
  content.addEventListener('click', async (e) => {
    const goto = e.target.closest('[data-goto]');
    if (!goto || switching) return;
    switching = true;

    if (reduceMotion()) {
      render(goto.dataset.goto);
    } else {
      const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
      await content.animate([{ opacity: 1 }, { opacity: 0, translate: '0 8px' }], {
        duration: 160,
        easing,
        fill: 'forwards',
      }).finished;
      render(goto.dataset.goto);
      content.getAnimations().forEach((a) => a.cancel());
      content.animate(
        [
          { opacity: 0, translate: '0 -8px' },
          { opacity: 1, translate: '0 0' },
        ],
        {
          duration: 280,
          easing,
        },
      );
    }

    // 閉じるボタンに枠が出ないよう、開いたときと同じく本文にフォーカスを戻す
    content.focus({ preventScroll: true });
    switching = false;
  });

  closeBtn?.addEventListener('click', () => modal.close());

  // 背景（::backdrop）クリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // 閉じたら開いたボタンへフォーカスを戻す
  modal.addEventListener('close', () => opener?.focus());
}

export function initWorks() {
  const list = document.querySelector('.js-works-list');
  if (!list) return;

  renderMarquee();
  list.innerHTML = works.map(cardTemplate).join('');
  initModal(list);
}
