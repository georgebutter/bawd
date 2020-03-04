const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  NODE_ENV = 'production',
} = process.env;
console.log(`Running ${NODE_ENV} build`);
module.exports = () => {
  return {
    entry: [
      './src/assets/scripts/index.tsx',
      './src/assets/styles/index.css',
    ],
    mode: NODE_ENV,
    devtool: 'source-map',
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
      })
    ],
  };
};
