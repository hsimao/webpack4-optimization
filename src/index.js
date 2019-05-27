// 同步 import 代碼分割方式
import _ from 'lodash'
console.log(_.join(['a', 'b', 'c'], '***'))

// 異步 import 代碼分割方式
function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hsi', 'Mao', '-'])
    return element
  })
}

// 調用 getComponent 方法 異步的去調用 lodash 檔案,
// 邏輯處理完時將結果印到 body 上
getComponent().then(element => {
  document.body.appendChild(element)
})
