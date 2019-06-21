var HtmlWebpackPlugin = require('html-webpack-plugin');
const DIR_PATH = __dirname + '/client/dist';
const webpack = require('webpack');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: "bundle.js",
    path: DIR_PATH
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('development')
      }
  })
  ]
}