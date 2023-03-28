# 俺のずんだもん

## 初期設定：Electron + React + Typescript + TailwindCSS

1. Electron + React + Typescript
    次のドキュメントに従う。[Electron公式ドキュメント](https://www.electronforge.io/guides/framework-integration/react-with-typescript)
2. += TailwindCSS
    1. 次のドキュメントに従う。[偉い人が作ってくれた記事](https://reactfocus.dev/tailwindcss-react-typescript-in-an-electron-app)
    2. `src/index.css`を`src/styles/globals.css`に移動させる。
    3. `src/app.tsx`に`import './styles/globals.css';`を追加する。

## エラー「Cannot find modules '*.png'」の解決

1. `types/image.d.ts`を以下の内容を追加する。

    ```typescript
    declare module "*.png";
    declare module "*.jpg";
    declare module "*.jpeg";
    declare module "*.gif";
    declare module "*.svg";
    ```

2. `package.json`に以下の内容を追加する。

    ```json
    "scripts": {
    "start": "npm run build && electron-forge start",
    "package": "npm run build && electron-forge package",
    "make": "npm run build && electron-forge make",
    "publish": "npm run build && electron-forge publish",
    "build": "tsc",
    ...
    }
    ```
# ore-zundamon
