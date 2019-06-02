# webpack4 - 環境變數配置 dev / prod

## 說明

```text
使用環境變數來判斷使用哪一種配置方式,
將統一在 webpack.common.js 導出前先利用環境變量判斷該合併哪個配置文件
```

### 配置 package.json

```text
1. 全部統一使用 webpack.common.js
2. 在線上打包時，設定環境變量，設置production參數(預設為 true)
```

```json
"scripts": {
  "dev-build": "webpack --config ./build/webpack.common.js",
  "dev": "webpack-dev-server --config ./build/webpack.common.js",
  "build": "webpack --env.production --config ./build/webpack.common.js"
},

```

### 在導出時接收環境變量，用環境變量來判斷 common 需合併哪隻配置文件

```js
module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}
```
