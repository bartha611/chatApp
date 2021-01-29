const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./client/index.jsx"],
  mode: "development",
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
      "^/api/*": {
        target: "http://localhost:8080/api/",
        secure: false,
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
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
