# プログラミングコンテストに向けて作成中

- 3DのWEBサイトを簡単に作れるツールです
- staticフォルダ配下にthree.jsのフォルダが必要です(リビジョン r118でのみ動作確認)

## 現段階の機能
- HTMLを３Ｄ空間上に描画できCSSで動的にデザインを変えられます。
- glb形式の３Dモデルや画像も描画できます。
- build.htmlで開発画面、index.htmlで作ったWEBサイト反映できます。
- エクスポートボタンを押すことで画像や3Dモデル,HTMLの位置情報などのデータがpeojectファイルに保存されます(saticフォルダ配下にprojectフォルダの作成が必要）
- index.htmlを表示させるときURLにproject="test"など設定したプロジェクト名をgetリクエストにかくことで保存した3Dモデルなどが描画されます。

デモ↓

https://github.com/NKMAK/web-site-3d-creation-tool/assets/89186723/feb119c8-95f5-4122-a969-77c027c65c4a

