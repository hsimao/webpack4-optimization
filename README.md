# webpack4 - 墊片 Shimming

## 說明

```text
某些 plugins 模塊會有自己的相依外部插件，但不會直接寫 import 在自己的檔案中,
都需要使用者自行安裝引入，但因為我們在開發時不可能去改插件的程式碼,
這時就需要使用 Shimming 的概念，讓 webpack 自動引入
```

### 以 jquery 為例子，某的 ui 插件需要引用到 jquery

1. 引入 webpack

```js
// webpack.common.js
const webpack = require('webpack')
```

2. 在 plugins 中新增 webpack.ProvidePlugin

```js
// webpack.common.js
plugins: [
  new webpack.ProvidePlugin({
  $: 'jquery', // 如果有模塊使用到 $ ，就自動引入 jquery
  }),
],
```

### 將每個 js 模塊中的 this 指向 window

1. 安裝 imports-loader

```bash
npm install imports-loader -D
```

2. 重新配置 js loader

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'imports-loader?this=>window',
        },
      ],
    },
  ]
}
```
