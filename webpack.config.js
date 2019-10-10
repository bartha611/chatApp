const DIR_PATH = `${__dirname}/client/dist`;
const webpack = require("webpack");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: ["babel-polyfill", "./client/index.jsx"],
  output: {
    filename: "bundle.js",
    path: DIR_PATH,
    publicPath: "/"
  },
  mode: "production",
  resolve: { extensions: [".js", ".jsx"] },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
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
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "ru"]
    })
  ]
};
