const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer)
  } else if (m.name) {
    return m.name
  } else {
    return false
  }
}

module.exports = {
  entry: {
    main: './src/index.js',
    about: './src/about.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['main'],
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      chunks: ['about'],
      template: path.resolve(__dirname, '../src/about.html'),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        // 將所有 .css 檔案全部拆分到一隻 styles 檔案內
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },

        // 依據不同 entry 入口, 切割出對應名稱的 css 檔案
        mainStyles: {
          name: 'main',
          test: (m, c, entry = 'main') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        aboutStyles: {
          name: 'main',
          test: (m, c, entry = 'about') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}
