import { banners } from '../data/banners.js';

/**
 * バナーギャラリー：データから一覧を描画し、クリックで拡大表示（<dialog>）
 */

const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (c) => ESCAPE_MAP[c]);

const captionOf = (banner) => `${banner.media}｜${banner.type}`;

const ratioOf = (banner) => (banner.width / banner.height).toFixed(3);

const itemTemplate = (banner, index) => `
  <li class="p-banner__item p-banner__item--${banner.size}" style="--ratio: ${ratioOf(banner)}">
    <button class="p-banner__button" type="button" data-index="${index}" aria-haspopup="dialog">
      <img class="p-banner__img" src="${escapeHtml(banner.src)}" alt="${escapeHtml(captionOf(banner))}のバナー"
        width="${banner.width}" height="${banner.height}" loading="lazy" decoding="async">
      <span class="p-banner__caption" aria-hidden="true">
        <span>${escapeHtml(banner.media)}</span>${escapeHtml(banner.type)}
      </span>
    </button>
  </li>`;

function initLightbox(list) {
  const lightbox = document.querySelector('.js-lightbox');
  const img = document.querySelector('.js-lightbox-img');
  const caption = document.querySelector('.js-lightbox-caption');
  const figure = document.querySelector('.js-lightbox-figure');
  const closeBtn = document.querySelector('.js-lightbox-close');
  if (!lightbox || !img) return;

  let opener = null;

  list.addEventListener('click', (e) => {
    const button = e.target.closest('[data-index]');
    if (!button) return;
    const banner = banners[Number(button.dataset.index)];
    opener = button;
    img.src = banner.src;
    img.alt = `${captionOf(banner)}のバナー`;
    if (caption) caption.textContent = captionOf(banner);
    lightbox.showModal();
    // 閉じるボタンに枠が出ないよう画像側にフォーカス（Tab キーでは閉じるボタンへ移動できる）
    figure?.focus({ preventScroll: true });
  });

  closeBtn?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => opener?.focus());
}

export function initBanners() {
  const list = document.querySelector('.js-banner-list');
  if (!list) return;

  list.innerHTML = banners.map(itemTemplate).join('');
  initLightbox(list);
}
