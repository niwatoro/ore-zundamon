# 俺のずんだもん

## 初期設定：Electron + React + Typescript + TailwindCSS

1. Electron + React + Typescript

    [Electron公式ドキュメント](https://www.electronforge.io/guides/framework-integration/react-with-typescript)に従う。

2. += TailwindCSS

    1. [偉い人が作ってくれた記事](https://reactfocus.dev/tailwindcss-react-typescript-in-an-electron-app)に従う。
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

## VOICEVOXサーバーの起動

1. voicevox_engineをダウンロード、解凍して`/voicevox/`中に展開する。
2. `package.json`にサーバーの起動コマンドを追加する。

    ```json
    "scripts": {
        ...,
        "start:server": "cd voicevox && chmod +x run && xattr -cr run && xattr -r -d com.apple.quarantine * && ./run &"
        },
    ```

    **補足**
    1. `xattr -cr /path/to/file`: ファイルは一度でも起動すると、推定ファイル種類などメタデータが書き込まれる。実行環境によってはこれで動作が変わる場合があるので削除しておくとよい。
    2. `xattr -r -d com.apple.quarantine *`: Appleが「悪意ある開発者」が関わっていないことを保証できなければ、ファイルを開かせないというはた迷惑な仕様があるので、回避しておかないと実行できない。
    3. `./run &`: コマンドの最後に`&`を付けておくとバックグラウンドで実行してくれる。これでコンソール一つでプロセスをいくつも走らせることができる。

3. `src/index.ts`の`app.on("ready", ()=>{})`に以下の関数を追加する。

    ```typescript
    const startServer = () => {
        spawn("npm", ["run", "start:server"], {
            cwd: __dirname,
            detached: true,
            stdio: "ignore",
        }).unref();
    };
    ```

    **補足**

    `spawn("npm", ["run", "start:server"], {...})`: あるプロセスを親として子プロセスを紐つけることができる。たぶん、これで一斉に終了させているんだと思う。

## Electron APIを使うには

このライブラリ構成だとメインとレンダラーが厳密に分離されている。そのため`src/preload.ts`を介してメインプロセスのAPIをレンダラーに部分的に開放する。[Electron公式ドキュメント](https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation)に従う。

1. `src/index.ts`でElectron APIを使う関数を定義
2. `src/index.ts`の`app.on("ready", ()=>{})`に以下の関数を追加する。

    ```typescript
    ipcMain.handle("do-a-thing", doAThing);
    ```

3. `src/preload.ts`で`contextBridge`を使ってメインプロセスのAPIをレンダラーに部分的に開放

    ```typescript
    contextBridge.exposeInMainWorld("myAPI", {
        doAThing: () => ipcRenderer.invoke("do-a-thing"),
    });
    ```

4. `src/components/MyCompononet.tsx`で呼び出す。

    ```typescript
    const result = await window.myAPI.doAThing();
    ```
