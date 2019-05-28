# Webpack 打包分析

## [webpack analyse](https://github.com/webpack/analyse/)

## 產出分析檔案指令

```json
webpack --profile --json > stats.json
```

## 合併到 package.json 內的 build script 指令

```json
  "scripts": {
    ...
    "dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",
    ...
  },
```

# 執行打包指令, 會自動生成 stats.json 在根目錄

```bash
npm run dev-build
```

## 數據可視化, 將 stats.json 上傳到以下網址

http://webpack.github.io/analyse/

## 其它可視化顯示工具

https://webpack.js.org/guides/code-splitting#bundle-analysis

## 推薦可視化插件 webpack-bundle-analyzer, 需要安裝

https://github.com/webpack-contrib/webpack-bundle-analyzer

### install

```bash
npm install --save-dev webpack-bundle-analyzer
```

### use, 安裝設定在 webpack production 設定檔案內, 只在打包時使用, 開發模式時不使用

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
}
```

### 打包完時將會彈出可視化網址

```bash
npm run build
```
