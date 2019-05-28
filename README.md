# webpack 優化 prefetching

## 說明

```text
Code Splitting 方法是利用緩存方式，來提高第二次的訪問速度
而 Prefetching 優化方向則是，提高每隻檔案的使用率，
將非必要再首次訪問時的程式碼寫成異步 import 方式，
等待首次訪問時將主要的程式碼載入完後，在閒置時才接著載入異步代碼(使用prefetching)
來達成首次訪問就能提高速度的優化
```

### 查看網頁代碼未使用率方式, 打開瀏覽器開發者模式，顯示 coverage

```text
1.) 瀏覽器打開開發者模式
2.) command + shirt + P
3.) 輸入 coverage
4.) 點選下方圓圈 開始錄製按鈕，接著刷新頁面
5.) 查看 unused bytes 欄位的 百分比，就是沒有用到的程式碼百分比
6.) 查看該檔案, 左側線條顏色, 綠色代表有使用，紅色代表未使用
```

### webpack 建議代碼撰寫方式，將交互的程式碼獨立撰寫, 在使用異步 import 方式調用即可提升首次訪問時的檔案代碼使用率, 這也是 webpack 在 chunks 預設配置為 async 的原因 chunks: 'async'

### 獨立將 事件邏輯寫一隻檔案 click.js

```js
function handleClick() {
  const element = document.createElement('div')
  element.innerHTML = 'HSI MAO'
  document.body.appendChild(element)
}

export default handleClick
```

### 在業務邏輯代碼內使用異步 import 方法呼叫, 並使用 prefetch, 在加載完所有主要代碼時，才接著載入 click.js 代碼

```js
document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => func())
})
```

### Preload 說明

```js
// 使用 Preload , 該隻檔案將會跟主要代碼同步進行加載，這樣就喪失原本優化目的，較不常使用
document.addEventListener('click', () => {
  import(/* webpackPreload: true */ './click.js').then(({ default: func }) => func())
})
```
