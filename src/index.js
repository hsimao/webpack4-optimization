// Tree Shaking
// webpack 2.0 之後的版本都會自動內建此功能
// 只支持 ES Module 靜態引入(import 方式), 不支持 require 動態引入
// mode 開發模式 development 不會使用 tree shaking 功能
import { add } from './math.js'

add(1, 2)
