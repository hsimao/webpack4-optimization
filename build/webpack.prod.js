const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [new BundleAnalyzerPlugin()],
}

module.exports = merge(commonConfig, prodConfig)
