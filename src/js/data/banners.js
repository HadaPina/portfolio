/**
 * バナーギャラリーのデータ（PC・スマホとも、この順番で並ぶ）
 *
 * 画像の追加方法：
 *   1. 元画像（PNG / JPG）を assets-src/banners/ に置き、npm run images を実行
 *      → public/images/banners/ に WebP（幅1200px以内）が出力される
 *   2. 下に size・src と元画像の width / height を書く
 *
 * size  : 表示サイズの区分（content / line / wide / slim）
 * media : バナーのサイズ区分の名前
 * type  : バナーの内容
 * width / height : 元画像のサイズ。縦横比に合わせて、行がすき間なく埋まるように幅が決まる
 */
export const banners = [
  {
    size: 'content',
    src: 'images/banners/content-77777pt.webp',
    media: 'コンテンツページ用',
    type: '77,777ポイント抽選キャンペーン',
    width: 1600,
    height: 900,
  },
  {
    size: 'content',
    src: 'images/banners/content-50000pt.webp',
    media: 'コンテンツページ用',
    type: '50,000ポイント抽選キャンペーン',
    width: 1600,
    height: 900,
  },
  {
    size: 'content',
    src: 'images/banners/content-200000pt.webp',
    media: 'コンテンツページ用',
    type: '20万ポイント山分けキャンペーン',
    width: 1600,
    height: 900,
  },
  {
    size: 'line',
    src: 'images/banners/line-clarion-set.webp',
    media: 'LINE用',
    type: 'スマホ連携セット 新登場',
    width: 770,
    height: 500,
  },
  {
    size: 'line',
    src: 'images/banners/line-friend-coupon.webp',
    media: 'LINE用',
    type: 'お友だち限定クーポン',
    width: 770,
    height: 500,
  },
  {
    size: 'line',
    src: 'images/banners/line-blitz-radar.webp',
    media: 'LINE用',
    type: 'レーダー探知機 商品紹介',
    width: 770,
    height: 500,
  },
  {
    size: 'line',
    src: 'images/banners/line-point-double.webp',
    media: 'LINE用',
    type: '全品ポイント2倍',
    width: 770,
    height: 500,
  },
  {
    size: 'wide',
    src: 'images/banners/wide-genre-point-up.webp',
    media: '横長バナー（大）',
    type: 'ジャンル別ポイントアップ',
    width: 1080,
    height: 420,
  },
  {
    size: 'wide',
    src: 'images/banners/wide-rocky-carrier.webp',
    media: '横長バナー（大）',
    type: 'ロッキープラス コラボ新商品',
    width: 1080,
    height: 420,
  },
  {
    size: 'slim',
    src: 'images/banners/slim-5-0-day.webp',
    media: '横長バナー（小）',
    type: '5と0の付く日 ポイント5倍',
    width: 1080,
    height: 210,
  },
  {
    size: 'slim',
    src: 'images/banners/slim-east-west-coupon.webp',
    media: '横長バナー（小）',
    type: '東西クーポン対決',
    width: 1080,
    height: 210,
  },
  {
    size: 'wide',
    src: 'images/banners/wide-autosock-coupon.webp',
    media: '横長バナー（大）',
    type: 'オートソック 早割クーポン',
    width: 1440,
    height: 560,
  },
  {
    size: 'wide',
    src: 'images/banners/wide-tanabata-coupon.webp',
    media: '横長バナー（大）',
    type: '七夕 限定クーポン',
    width: 1040,
    height: 380,
  },
  {
    size: 'slim',
    src: 'images/banners/slim-review.webp',
    media: '横長バナー（小）',
    type: 'レビュー投稿キャンペーン',
    width: 1080,
    height: 210,
  },
  {
    size: 'slim',
    src: 'images/banners/slim-tonyin-brand.webp',
    media: '横長バナー（小）',
    type: '新取り扱いブランド紹介',
    width: 1080,
    height: 210,
  },
];
