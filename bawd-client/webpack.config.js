const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  NODE_ENV = 'development',
} = process.env;
console.log(`Running ${NODE_ENV} build`);
module.exports = {
  entry: './src/index.tsx',
  mode: NODE_ENV,
  devtool: 'source-map',
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ]
};
