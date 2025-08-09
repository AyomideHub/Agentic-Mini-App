const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'] // Extract CSS to file
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // Extract CSS to separate file
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),

    // widget.html
    new HtmlWebpackPlugin({
      template: './public/widget.html',
      filename: 'widget.html',
      inject: 'body'
    }),

    // index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    static: './dist',
    port: 3000,
    hot: true
  },
  mode: 'development'
};
