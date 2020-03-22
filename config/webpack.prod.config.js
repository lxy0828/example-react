const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中
// 导入抽取CSS的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 导入压缩CSS的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
  mode: 'production', // 开发模式
  entry: path.join(__dirname, "../src/index.js"),
	output: {
    path: path.join(__dirname, "../lib/"),
    filename: "index.js",
    libraryTarget: 'umd', // 采用通用模块定义, 注意webpack到4.0为止依然不提供输出es module的方法，所以输出的结果必须使用npm安装到node_modules里再用，不然会报错
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
  },
	module: {
		rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      {
        test: /\.less$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      // {
      //   test: /\.css$/,
      //   loader: ['style-loader','css-loader?modules'],
      // },
      // {
      //   test: /\.css$/,
      //   loader: [MiniCssExtractPlugin.loader,'css-loader?modules'],
      // },
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.cm\.styl$/,
      //   loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
      // }
    ]
	},
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "main.min.css" // 提取后的css的文件名
    // })
    new ExtractTextPlugin("main.min.css"), // 抽取CSS文件
    new OptimizeCssAssetsPlugin()// 压缩CSS的插件
  ],
	externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置
