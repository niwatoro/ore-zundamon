# 俺のずんだもん

## 初期設定：Electron + React + Typescript + TailwindCSS

1. Electron + React + Typescript
    次のドキュメントに従う。[Electron公式ドキュメント](https://www.electronforge.io/guides/framework-integration/react-with-typescript)
2. += TailwindCSS
    1. 次のドキュメントに従う。[偉い人が作ってくれた記事](https://reactfocus.dev/tailwindcss-react-typescript-in-an-electron-app)
    2. `src/index.css`を`src/styles/globals.css`に移動させる。
    3. `src/app.tsx`に`import './styles/globals.css';`を追加する。
