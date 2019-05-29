# webpack css 代碼拆分

### 說明

    預設 webpack 會將 css 寫在 js 檔案內 （css in js)
    若要將 css  抽出獨立成為一隻檔案, 需要使用插件

### 拆分意義

    css分割意義不大，現在的網速已經很快了。除非行動裝置，你想讓頁面展示的更快一些，把 css 分離出來，才可能會略微有一點點用處。

### 安裝 css 拆分插件

```bash
npm install --save-dev mini-css-extract-plugin
```

### 使用 mini-css-extract-plugin

[官方插件說明](https://webpack.js.org/plugins/mini-css-extract-plugin)

1.) 替換掉原本的 style-loader, 開發、生產模式都需設定

```js
loader: MiniCssExtractPlugin.loader,
```

2.) 開發模式啟用熱加載功能 webpack.dev.js

```js
options: {
  hmr: true, // 開啟熱加載功能
},
```

3.) 完整 css loader rules 配置

```js
{
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true, // 熱加載
      },
    },
    'css-loader',
    'postcss-loader',
  ],
},
```

4.) plugins 設置：開發模式 webpack.dev.js

```js
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
```

4.) plugins 設置: 生產模式設定 webpack.prod.js

```js
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
```

### 注意事項

    如果有使用 tree Shaking 設定, 需要特別去 package.json 設定 sideEffects, 避免在生產模式打包時被剔除掉

```json
  // package.json
  "sideEffects": [
    "*.css"
  ],
```

### 壓縮 css

    使用 optimize-css-assets-webpack-plugin 插件,
    可只設定在生產模式即可，上線版在壓縮

```bash
npm install optimize-css-assets-webpack-plugin --save-dev
```

```js
// webpack.prod.js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
```

```js
// webpack.prod.js
optimization: {
  minimizer: [new OptimizeCSSAssetsPlugin({})],
},

```

### 壓縮 css 注意事項

    因為設定 optimization.minimizer 會覆蓋掉 js 的壓縮配置,
    所以要另外再安裝壓縮 js 插件另外配置一次

```bash
npm install terser-webpack-plugin --save-dev
```

```js
// webpack.prod.js
const TerserJSPlugin = require('terser-webpack-plugin')
```

```js
// webpack.prod.js
  optimization: {
    minimizer: [
	new TerserJSPlugin({}),
	new OptimizeCSSAssetsPlugin({})
    ],
```

### 如果有多個 entry 但全部都只產出一個對應 css 文件, 配製方法

設定 splitChunks

```js
// webpack.common.js
optimization: {
  usedExports: true,
  splitChunks: {
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
},
```

### 對應多個 entry 配置切割出對應多個 css 文件

設定 splitChunks

```js
// webpack.common.js
    splitChunks: {
      cacheGroups: {
        // 依據不同 entry 入口, 切割出對應名稱的 css 檔案
        mainStyles: {
          name: 'main',
          test: (m, c, entry = 'main') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        aboutStyles: {
          name: 'main',
          test: (m, c, entry = 'about') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
```

### 多頁面 html template 配置

設定 entry

```js
// webpack.common.js
entry: {
  main: './src/index.js',
  about: './src/about.js',
},
```

2.) 設定多組 HtmlWebpackPlugin

```js
// webpack.common.js
plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    chunks: ['main'],
    template: path.resolve(__dirname, '../src/index.html'),
  }),
  new HtmlWebpackPlugin({
    filename: 'about.html',
    chunks: ['about'],
    template: path.resolve(__dirname, '../src/about.html'),
  }),
],
```
