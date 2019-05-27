const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    // 若要在開發環境下使用 tree shaking, 需設定 usedExports: true
    usedExports: true,
  },
}

module.exports = merge(commonConfig, devConfig)
