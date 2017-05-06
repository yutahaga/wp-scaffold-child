# wp-scaffold
WordPress でのサイト開発用テンプレートです。

## Feature

* Docker Compose での楽々ローカル環境構築
* Wordmove で簡単デプロイ
* ES2015 や 各種 AltCSS に対応

## Requirements

* Node.js
* Docker & Docker Compose

## Initialize

```sh
curl -LOk https://github.com/yutahaga/wp-scaffold/archive/master.zip
unzip master.zip
mv wp-scaffold-master your-site-name
cd your-site-name
npm run wp-init
npm install
```

## Build

```sh
npm run build
```

## Development

```sh
npm run serve
npm run dev
```

この状態でファイルを編集して保存すると自動でビルドが走り、
BrowserSync が変更をキャッチしてブラウザをリロードします。

## Deploy
`public/` がドキュメントルートになります。
`public/` をルートディレクトリにして git で管理するのがオススメです。

`wordmove` が使用できる環境であれば `wordmove` でのデプロイを推奨します。
Docker でローカルサーバーが動いている状態ならばサーバー経由で `wordmove` コマンドを使用することができます。

`Movefile` を本番環境に合わせて編集し、ご利用ください。

```sh
yarn wordmove push --all
```
