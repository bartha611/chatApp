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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}