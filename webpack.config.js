const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, outputDirectory),
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: "[name].bundle.js",
    publicPath: "/",

    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: "[name].bundle.js",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(mp4|jpe?g|png|woff|pdf|woff2|eot|ttf|svg|otf)$/,
        loader: "file-loader?limit=100000",
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.txt$/i,
        use: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  devServer: {
    inline: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
    publicPath: "/",
    port: 3000,
    hot: true,
    disableHostCheck: true,
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new CopyPlugin({
      patterns: [{ from: "other", to: "./" }],
    }),
  ],
};
