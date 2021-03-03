const HTMLWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: ["babel-polyfill", "./client/index.jsx"],
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/",
    path: `${__dirname}/dist`,
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: "localhost",
    port: 3000,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
};
