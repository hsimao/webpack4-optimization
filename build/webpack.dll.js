const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    // 設定要統一打包成一個檔案的第三方插件
    vendors: ['lodash'],
    // react 相關插件獨立一隻檔案
    react: ['react', 'react-dom'],
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 將打包完的檔案設定成為全局變量，以便引入
    library: '[name]',
  },
  plugins: [
    // 使用 dllplugin, 產生映射檔案 manifest.json
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
}
