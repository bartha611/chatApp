const DIR_PATH = `${__dirname}/client/dist`;
const webpack = require("webpack");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./client/index.jsx"],
  output: {
    filename: "bundle.js",
    path: DIR_PATH,
    chunkFilename: "[name].bundle.js",
    publicPath: "/"
  },
  devtool: "source-map",
  mode: "production",
  resolve: { extensions: [".js", ".jsx"] },
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
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: "url-loader?limit=100000"
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      title: "Flack"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new CleanWebpackPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "ru"]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MomentTimezoneDataPlugin({
      matchZones: /^America/,
      startYear: 2019
    })
  ]
};
