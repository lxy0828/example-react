module.exports = {
	module: {
		rules: [
      {
        // 通过 babel-loader 来编译处理 js 和 jsx 文件
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      { // 用于加载组件或者css中使用的图片
        test: /\.(jpg|jpeg|png|gif|cur|ico|svg)$/,
        use: [{
         loader: 'file-loader', options: {
         name: "images/[name][hash:8].[ext]"
         }
        }]
      }
    ]
	},
};
