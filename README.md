# webpack4 - 插件開發配置 Library

### output 配置

```js
output: {
  filename: 'library.js',
  path: path.resolve(__dirname, '../dist'),
  library: 'marsLibrary', // 配置全局變數, 提供使用 script 引入方式
  libraryTarget: 'umd', // 提供支援 import 跟 require 引入方式
},
```

### externals 配置

如果該插件有引用到第三方插件, 則需要配置 externals 將該插件排除，避免其他使用模塊也引用相同庫時發生衝突

```js
module.exports = {
  externals: ['lodash'],
}
```

### package.json main 路徑配置

```json
  "main": "./dist/library.js",
```

### 使用方式

1. 安裝

```bash
npm install mars-library-test -S
```

2. 引入

```js
import { math } from 'mars-library-test'

const { math } = require('mars-library-test')

math.add(10, 10)
```
