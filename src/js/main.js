import { initHeader } from './modules/header.js';
import { initReveal } from './modules/reveal.js';
import { initWorks } from './modules/works.js';
import { initBanners } from './modules/banners.js';

// 機能ごとにモジュールを分割し、エントリーポイントでは初期化のみを行う
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initWorks();
  initBanners();
  initReveal();
});
