const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './assets/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.ts$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.tsx$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({ template: './assets/index.html' })],
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services/'),
      '@components': path.resolve(__dirname, 'src/components/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      watch: {
        ignored: /node_modules/,
      },
    },
  },
};
