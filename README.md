# webpack - Caching 緩存

## 說明

```text
改變代碼時重新打包，因為檔名一樣，用戶瀏覽器會有緩存，所以無法使用最新檔案，這時就需要配置 contenthash 來判斷更改檔名，讓用戶端瀏覽器抓取最新檔案。
```

### 在上線配置中修改 output,  開發模式不用 (已有熱加載功能)

```js
// webpack.prod.js
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js',
},
```

### 注意, 在 webpack 低版本上需要加上 runtimeChunk 配置

```text
因為低版本在記錄 chunk 相依關係的 manifest 會存放在各自的檔案內, 
只要檔案一更改，雙方的檔案內容也會一並更改, 
因此需要另外配置 runtimeChunk 產生單一檔案來記錄 manifest, 
避免每次更新都會將所有檔案的 hash 值一併更新

加上對於新版本也不會影響，所以就建議直接加上
```

```js
// webpack.common.js
optimization: {
  runtimeChunk: {
    name: 'runtime'
  },
}
```