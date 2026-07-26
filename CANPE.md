# 変更内容カンペ

## 1. ダッシュボード検索
- 対象: [src/pages/DashboardPage.jsx](src/pages/DashboardPage.jsx)
- 内容: 商品名で検索できる入力欄を追加
- 位置: ダッシュボード上部の検索欄
- 仕組み: 入力した文字列を含む商品名だけを表示

## 2. ダッシュボード並び替え
- 対象: [src/pages/DashboardPage.jsx](src/pages/DashboardPage.jsx)
- 内容: 「新しい順」「古い順」を選択できるようにした
- 位置: 検索欄の横のセレクトボックス
- 仕組み: ID順で並び替え

## 3. ダッシュボードステータス絞り込み
- 対象: [src/pages/DashboardPage.jsx](src/pages/DashboardPage.jsx)
- 内容: 「全て」「作りたい」「作った」「また作りたい」で表示を絞り込める
- 位置: 検索欄の横のセレクトボックス
- 仕組み: 選択したステータスに一致する内容だけを表示

## 4. ステータス別ページの検索・並び替え・切り替え
- 対象: [src/pages/StatusPage.jsx](src/pages/StatusPage.jsx)
- 内容: ステータス別ページでも検索、並び替え、他ステータスへの切り替えができる
- 位置: ページ上部の操作エリア
- 仕組み: URLのステータスに応じた一覧を表示

## 5. 編集・削除ボタン
- 対象: [src/components/ContentCard.jsx](src/components/ContentCard.jsx)
- 内容: 各カードに「編集」「削除」ボタンを追加
- 位置: カード右上
- 仕組み: 編集は編集ページへ遷移、削除は一覧から除外

## 6. いいね機能
- 対象: [src/components/ContentCard.jsx](src/components/ContentCard.jsx)
- 内容: 各カードでいいねのオン/オフができる
- 位置: カード上部のボタン
- 仕組み: いいね状態を切り替えて表示を変える

## 7. 総いいね数表示
- 対象: [src/pages/DashboardPage.jsx](src/pages/DashboardPage.jsx)
- 内容: ダッシュボードの見出し横に総いいね数を表示
- 位置: 「生成したコンテンツ（全◯件）」の横
- 仕組み: likedがtrueの件数を集計

## 8. スタイル関連
- 対象: [src/pages/DashboardPage.module.css](src/pages/DashboardPage.module.css), [src/components/ContentCard.module.css](src/components/ContentCard.module.css)
- 内容: 検索欄、並び替えセレクト、ボタン、いいねボタンなどの見た目を調整
- 位置: 各ページ・コンポーネントのスタイル定義
