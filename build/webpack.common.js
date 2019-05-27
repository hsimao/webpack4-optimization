const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
  ],
  optimization: {
    // 代碼分割設定 code splitting
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 檔案大於 30kb 才會進行代碼分割
      maxSize: 0, // 檔案如果超過此設定大小, 將會嘗試在進行拆分, 如果該檔案無法拆分就跳過, 通常比較少設定, 預設為0
      minChunks: 1, // 入口文件使用超過 1 次才會進行代碼分割
      maxAsyncRequests: 5, // 限制最多分割 5 個檔案, 超過就不在進行分割
      maxInitialRequests: 3, // 整個網頁首頁或入口文件進行加載時, 所 import 的檔案最多分割3個檔案
      automaticNameDelimiter: '~',
      name: true,
      // 符合以上規則的都會先入緩存(cache), 等所有檔案判斷完後再接續進行 cacheGroups 內的設定判斷
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 優先權重(數字越大權重越高), 如果 import 的檔案同時符合 vendors 跟 default 規則，將依據權重決定
          // filename: 'vendors.js', // 自訂代碼分割檔案名稱, (注意，如果有使用異步import, 且使用 webpackChunkName 自訂名稱，將會與此設定衝突 )
        },
        default: {
          priority: -20,
          reuseExistingChunk: true, // 如果此代碼分割模塊內有引用到已經代碼分割的模塊, 就不在針對該模塊重新分割一次, 直接關聯之前分割模塊即可
          // filename: 'common.js', // 自訂代碼分割檔案名稱 (注意，如果有使用異步import, 且使用 webpackChunkName 自訂名稱，將會與此設定衝突 )
        },
      },
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
}
