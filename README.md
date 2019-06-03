# webpack4 - 打包速度優化

### 更新 node、npm、yarn 到最新版本

### loader 設定：

    指定不編譯 node_modules 資料夾內的 js 檔案
    或指定編譯特定路徑底下的檔案

1. 設定 exclude 不編譯 node_modules 底下的 js 檔案

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ]
}
```

2. 只編譯 src 資料夾內的 js 檔案

### package.json main 路徑配置

```js
module: {
  rules: [
    {
      test: /\.js$/,
      include: path.resolve(__dirname, '../src'),
      loader: 'babel-loader',
    },
  ]
}
```

### plugins 選擇官方提供的插件，開發模式下不需用的插件就不用使用, 例如壓縮 css 代碼的插件

### 不要設定過多的 resolve, 不然每次每次判斷都是需要時間

```js
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
```

### 單獨將第三方插件進行打包一次, 之後打包時將優先引用已打包好的檔案, 節省打包時間

1. 新增 webpack.dll.js 檔案 , 配置第三方插件

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    // 將所有使用到的第三方插件添加進來，統一打包成 vendors.dll.js 檔案
    vendors: ['react', 'react-dom', 'lodash'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 將 vendors 設定為全局變數, 以便後續引用
    library: '[name]',
  },
}
```

2. package.json 新增 build:dll 指令

```json
"build:dll": "webpack --config ./build/webpack.dll.js"
```

3. 配置 webpack.common.js 將第三方插件打包出來的檔案引入

```bash
// 先安裝可以在 html 自動引入 script 的插件
npm install add-asset-html-webpack-plugin --save
```

4. 使用 webpack.DllPlugin, 產生映射檔案 manifest.json

```js
// webpack.dll.js
const webpack = require('webpack')

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
```

執行打包生成 dll 相關檔案

```bash
npm run build:dll
```

5. 設定 webpack.common.js 透過映射檔案 vendors.manifest.json, 只要有引用第三方插件, 將優先判斷是否有在 dll.js 內, 有就使用 vendors.dll.js, 沒有的話才引用 node_modules 內的檔案

```js
// webpack.common.js
const webpack = require('webpack')

  plugins: [
    new webpack.DllReferencePlugin({
      manifes: path.resolve(__dirname, '../dll/vendors.manifest.json'),
    }),
  ],
```

6. 進階拆分 dll 檔案

```js
// webpack.dll.js
  entry: {
    vendors: ['lodash'],
    // react 相關插件獨立一隻檔案
    react: ['react', 'react-dom'],
    // jquery 獨立一隻檔案
    jquery: ['jquery']
  },

```

7. 自動判斷 ./dll 目錄底下有多少個檔案，自動添加成 plugins 陣列格式

// webpack.common.js

```js
// 引入 fs
const fs = require('fs')
```

```js
// 將所有 webpack 插件使用 plugins 陣列儲存
const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../'),
  }),
]

// 抓取 dll 資料夾底下所有的檔案
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))

// 抓取 dll 資料夾底下所有的檔案
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))

// 使用 forEach 逐一判斷添加插件到 plugins 陣列內
files.forEach(file => {
  // 如果檔名結尾是 .dll.js
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file),
      })
    )
  }

  // 如果檔名結尾是 .manifest.json
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file),
      })
    )
  }
})
```

將添加完的 plugins 陣列設定到 plugins 內

```js
module.exports = {
  plugins,
}
```
