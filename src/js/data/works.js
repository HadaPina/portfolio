/**
 * 制作実績データ
 * 実績の追加・修正はこのファイルだけで完結する（HTMLを触らずに更新できる設計）
 *
 * summary  : 一覧カード用の短いひと言（体言止め・句読点なし・30字前後）
 * headline : 成果をひと言で伝える一文（「詳しく見る」の冒頭に表示）
 * results  : 成果の数字。「label（何が）→ value + unit（どうなった）→ note（補足）」の順で表示
 *            results[0] が一覧カードの代表成果になる
 * pages    : 詳細モーダルに並べる制作物。image は public/images/works/ の WebP ファイル名（拡張子なし）
 *            sp: true の場合は「{image}-sp.webp」をスマホ版として重ねて表示
 *            marquee: false の場合は、実績一覧の上を流れる画像に含めない
 *            （npm run capture でスクリーンショットを自動撮影 → npm run images で WebP 化）
 */
export const works = [
  {
    id: 'autosock',
    no: '01',
    title: '布製タイヤチェーン|「AutoSock」',
    shortTitle: 'AutoSock 特設サイト・|適合検索',
    summary: 'じっくり読まれて問い合わせの少ないページを実現',
    headline:
      '商品の魅力と仕様をきちんと伝えることにこだわり、じっくり読まれ、問い合わせの少ないページを実現しました。',
    tags: ['HTML/CSS', 'JavaScript', 'ライティング', '検索ツール開発'],
    period: '2ヶ月',
    role: '企画・ライティング・デザイン・コーディング・検索ツール開発',
    background:
      'メーカー・代理店の信頼を得て、各ECモールでの販売を一任\n当店独自に販促を強化する方針',
    purpose: '商品の魅力を伝えること、仕様・適合に関する問い合わせを削減すること',
    actions: [
      '商品ページ制作（魅力付けの構成、FAQの設置）',
      '特設サイトのライティング・制作',
      'JavaScriptによる適合検索ページの企画・開発',
    ],
    results: [
      {
        label: '仕様・適合に関する問い合わせ',
        value: '55',
        unit: '%削減',
        note: '適合検索ページの公開後',
      },
      {
        label: '特設サイトの平均滞在時間',
        value: '120',
        unit: '秒',
        note: 'じっくり読まれるコンテンツに',
      },
    ],
    plusAlpha:
      '依頼は商品ページとコラム制作でしたが、問い合わせの多くが「適合」だったことに着目し、ユーザー自身で確認できる検索ページを提案・開発しました。',
    pages: [
      {
        label: '特設サイト',
        description:
          '布製タイヤチェーンのメリット・デメリットや選び方を解説する、読み物型の特設ページです。',
        url: 'https://shopping.geocities.jp/creer-net/autosock2025/specialsite/',
        image: 'autosock-special',
        sp: true,
      },
      {
        label: '適合検索ページ',
        description:
          '車種・タイヤサイズから適合品番を検索できるツールです。JavaScriptで開発しました。',
        url: 'https://shopping.geocities.jp/creer-net/autosock2025/sizesearch/',
        image: 'autosock-search',
        sp: true,
      },
      {
        label: '商品ページ',
        description: '魅力付けの構成とFAQを設置し、購入前の不安を解消する商品ページにしました。',
        url: 'https://store.shopping.yahoo.co.jp/creer-net/hp-685.html',
        image: 'autosock-item',
        sp: true,
      },
    ],
  },
  {
    id: 'clevers',
    no: '02',
    title: 'カーコーティング専門店|「クレヴァーズ名古屋」',
    shortTitle: 'クレヴァーズ|名古屋 ECサイト',
    summary: '誰でも更新できるECサイトで公開翌月から受注を獲得',
    headline:
      '公開後に運用する別チームのため、HTMLの知識がなくても更新できるECサイトを立ち上げ、公開翌月から受注につなげました。',
    tags: ['HTML/CSS', 'カラーミーショップ', 'CMS構築'],
    period: '1ヶ月',
    role: 'ベース構築・コーディング',
    background:
      'Webデザインチームのコーダー不在により、ヘルプとして参画\n公開後はHTML/CSSの知識が浅いメンバーが運用する前提',
    purpose: 'HTML/CSSの知識が浅いメンバーでも更新できる環境の構築',
    actions: [
      'カラーミーショップ（CMS）を用いた新規ECサイトの立ち上げ',
      '専門知識不要で運用・更新できるベースの設計とコーディング',
      '別チームへの引き継ぎ',
    ],
    results: [
      {
        label: '公開翌月の新規受注',
        value: '40',
        unit: '件',
        note: '1件あたり約24万円の施工予約を、ゼロからのスタートで獲得',
      },
      {
        label: '引き継ぎ後の月間受注',
        value: '約2.3',
        unit: '倍',
        note: '別チームの運用で、今も成長中',
      },
    ],
    plusAlpha: '「作って終わり」ではなく、作った後に誰が・どう更新するかまでを設計に含めました。',
    note: '※立ち上げ時のベース構築を担当しました。現在は別チームへ引き継ぎ、運用・更新が行われています。',
    pages: [
      {
        label: 'ECサイト トップ',
        description: 'カラーミーショップで構築し、更新しやすいベースを設計・コーディングしました。',
        url: 'https://clevers-nagoya.com/',
        image: 'clevers',
        sp: true,
      },
    ],
  },
  {
    id: 'column',
    no: '03',
    title: 'コラム・|コンテンツ企画|（季節特集）',
    shortTitle: '季節特集コラム',
    summary: '専門店ならではのコラムで商品ページへお客様を案内',
    headline: 'カー用品店ならではの解説コラムで、広告に頼らず商品ページへお客様を案内しました。',
    tags: ['企画', 'ライティング', 'デザイン', 'HTML/CSS'],
    period: '1コラムにつき2週間（需要ピークの1ヶ月前に公開）',
    role: '企画・商品選定・ライティング・デザイン・コーディング',
    background: '季節ごとの需要に合わせて、店舗内で季節感を演出したいという課題',
    purpose: '店舗内の季節感の演出と、カー用品店ならではの専門知識を活かした購入動機付け',
    actions: ['企画・商品選定', 'ライティング（専門的な解説部分も担当）', 'デザイン・コーディング'],
    results: [
      {
        label: '需要ピーク期間の回遊率',
        value: '80',
        unit: '%超',
        note: 'コラムから商品ページなど店内の他ページへ進んだ割合',
      },
    ],
    plusAlpha:
      '需要ピークから逆算し、1ヶ月前に公開するスケジュールで検索流入の準備期間を確保しました。',
    pages: [
      {
        label: '春のメンテナンス特集',
        description: '冬のダメージを解消するための、メンテナンス&点検ポイントを解説しています。',
        url: 'https://shopping.geocities.jp/creer-net/spring2026/',
        image: 'column-spring',
        sp: true,
      },
      {
        label: '花粉対策特集',
        description: '車内の花粉対策をテーマに、関連商品へ自然に誘導するコラムです。',
        url: 'https://shopping.geocities.jp/creer-net/pollencare2026/',
        image: 'column-pollen',
        sp: true,
      },
      {
        label: '洗車特集',
        description: '洗車の手順やコツを、専門店の目線で紹介するコンテンツです。',
        url: 'https://shopping.geocities.jp/creer-net/carwash2026/',
        image: 'column-carwash',
        sp: true,
      },
    ],
  },
  {
    id: 'data-system',
    no: '04',
    title: 'データの一括管理|＆更新システム',
    shortTitle: 'データ一括管理|＆更新システム',
    summary: 'データ1箇所の更新で全モールに一括反映',
    headline: 'モールごとの手作業での修正を、データ1箇所の更新で一括反映できるようにしました。',
    tags: ['GAS', 'VBA', 'データベース設計', '業務効率化', 'スプレッドシート'],
    period: '1メーカーあたり2週間〜1ヶ月（段階的に適用範囲を拡大中）',
    role: '企画・設計・開発',
    background:
      '商品仕様の変更や新車種への適合対応のたびに、各モールの設定やHTMLを個別に修正\n作業工数の肥大化',
    purpose: '商品情報の更新作業を「1箇所の修正」で完結させること',
    actions: [
      '適合・仕様情報を集約するデータベースの設計（社内で導入済みのGoogle Workspaceを活かし、スプレッドシートで管理）',
      '誰でも操作できるよう、スプレッドシートに独自メニュー・UIを追加',
      'GAS/VBAでモール別のHTML・CSVを自動出力する仕組みの構築',
      '適合検索サイト・LINEUP案内ページへの展開',
    ],
    results: [
      {
        label: '商品情報を修正する場所',
        value: '1',
        unit: '箇所',
        note: 'データを直すと各ページへ一括反映',
      },
    ],
    plusAlpha:
      'ツールに詳しくないメンバーでも使えるよう独自メニューやUIを追加し、自分の作業だけでなくチーム全員の更新作業が軽くなる仕組みとして設計しました。\nこのように、手間のかかる作業を仕組みで減らす経験は、今後の制作でも活かせると考えています。',
    pages: [
      {
        label: 'テレビキャンセラー 適合検索',
        description: 'データベースから自動生成した、Bullconの製品ごとの適合品番検索ツールです。',
        url: 'https://www.rakuten.ne.jp/gold/creer/bullcon-match/',
        image: 'system-match',
        sp: true,
      },
      {
        label: 'ヒッチメンバー 適合検索',
        description:
          'メーカー・車種・年式から、サン自動車のヒッチメンバーの適合品番を探せる検索ツールです。',
        url: 'https://www.rakuten.ne.jp/gold/creer/sunauto-match/',
        image: 'system-match-sunauto',
        sp: true,
      },
      {
        label: 'ブレーキパッド 適合検索',
        description:
          'WinmaXのブレーキパッド・シューとディスクローターの適合品番を、車種から探せる検索ツールです。',
        url: 'https://www.rakuten.ne.jp/gold/creer/winmax-match/',
        image: 'system-match-winmax',
        sp: true,
      },
      {
        label: '洗車用品 LINEUP案内',
        description:
          'GYEONの商品ラインナップを一覧化した案内ページです。データを更新すると一括で反映されます。',
        url: 'https://www.rakuten.ne.jp/gold/creer/gyeonlineup2025/',
        image: 'system-lineup',
        sp: true,
      },
    ],
  },
  {
    id: 'rakuten-header',
    no: '05',
    title: '楽天市場店 PC用ヘッダー/|フッター改修',
    shortTitle: '楽天市場店 ヘッダー/|フッター改修',
    summary: '情報を増やしながらコンパクトにまとめたデザイン',
    headline: '仕様変更をきっかけに、情報は増やしながら、見た目はコンパクトにまとめました。',
    tags: ['UI設計', '情報設計', 'HTML/CSS', 'モール仕様対応'],
    period: '1週間',
    role: 'UI設計・デザイン・コーディング',
    background: '楽天市場の仕様変更に伴う、既存のヘッダー/フッターの改修',
    purpose: '新仕様への対応とあわせて、掲載情報を充実させつつ、店舗内の回遊性と操作性を高めること',
    actions: [
      'メニュー・コンテンツ・レビュー・話題の商品など掲載情報の拡充',
      '情報を増やしても間延びしない、密度の高いレイアウト設計',
      '導線を見直したUI設計',
      'デザイン・コーディング',
      '新仕様での表示検証',
    ],
    results: [
      {
        label: '仕様変更から対応完了まで',
        value: '1',
        unit: '週間',
        note: 'UI設計からコーディング・検証まで',
      },
    ],
    plusAlpha:
      '「仕様に合わせる」だけで終わらせず、掲載する情報を増やしながらもギュッと圧縮し、ひと目で多くの情報に触れられ、店舗内を回遊しやすいヘッダー/フッターにしました。',
    pages: [
      {
        label: 'Before',
        description: '改修前のヘッダー/フッターです。',
        url: 'https://item.rakuten.co.jp/creer/terzo-ea600nt/',
        image: 'rakuten-before',
        marquee: false,
      },
      {
        label: 'After',
        description:
          'メニュー・レビュー・話題の商品などの情報を増やしながら、コンパクトにまとめた改修後のデザインです。',
        url: 'https://item.rakuten.co.jp/creer/cleantle-tirewheelqd/',
        image: 'rakuten-after',
      },
    ],
  },
];
