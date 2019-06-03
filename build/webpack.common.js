const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../'),
  }),
]

// 抓取 dll 資料夾底下所有的檔案
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))

// 使用 forEach 逐一判斷添加插件到 plugins 陣列內
files.forEach(file => {
  // 如果檔名結尾是 .dll.js
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file),
      })
    )
  }

  // 如果檔名結尾是 .manifest.json
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file),
      })
    )
  }
})

module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 設定不編譯 node_modules 底下的檔案, 提高編譯速度
        exclude: /node_modules/,
        // 或設定只在特定路徑底下的 js 檔案才進行編譯, 以下為指定 src 資料夾底下
        // include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
    },
  },
}
