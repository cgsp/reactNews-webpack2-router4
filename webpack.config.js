var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");
module.exports = {
  devServer: {
    historyApiFallback: true
  },
  // performance: {
  //   // 超过限制就抛出一个警告
  //   hints: "warning",
  //   // 限制最终的bundle.js的大小是100k
  //   maxEntrypointSize: 100000,
  //   // css，图片的大小，不能超过450k
  //   maxAssetSize: 450000
  // },
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  devtool: 'source-map',
  entry: {
    app: "./src/root.js",
    vendor: ['react']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
      // {
      //   test: /\.css$/,
      //   loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:10]'
      // },
      // 下面是使用ant-design的样式配置文件
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "./dist/[name].js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
};