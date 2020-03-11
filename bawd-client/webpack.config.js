const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const {
  NODE_ENV = 'development',
  BONSAI_URL = 'http://localhost:9200',
} = process.env;

module.exports = () => {
  return {
    entry: [
      './src/assets/scripts/index.tsx',
      './src/assets/styles/index.css',
    ],
    mode: NODE_ENV,
    devtool: 'source-map',
    devServer: {
      port: 3200,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3100/',
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
    watch: NODE_ENV === 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/styles/index.css',
        chunkFilename: 'styles.css',
      }),
      new webpack.DefinePlugin({
        'BONSAI_URL': JSON.stringify(BONSAI_URL),
      }),
    ],
  };
};
