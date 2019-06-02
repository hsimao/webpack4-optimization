const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
  ],
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'libraryTest', // 配置全局變數, 提供使用 script 引入方式
    libraryTarget: 'umd', // 提供支援 import 跟 require 引入方式
  },
}
