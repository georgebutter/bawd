const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const {
  NODE_ENV = 'development',
} = process.env;

module.exports = () => {
  return {
    entry: [
      './src/assets/scripts/index.tsx',
      './src/assets/styles/index.css',
    ],
    output: {
      publicPath: '/',
    },
    mode: NODE_ENV,
    devtool: 'source-map',
    devServer: {
      port: 3200,
      contentBase: path.join(__dirname, 'dist'),
      // compress: true,
      hot: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3100/',
          pathRewrite: {
            '^/api': '',
          },
        },
      },
      historyApiFallback: {
        index: '/src/',
        rewrites: [
          {
            from: '/main.js',
            to: '/main.js',
          },
          {
            from: '/index.css',
            to: '/index.css',
          },
          {
            from: /^\/boards/,
            to: '/index.html',
          },
          {
            from: '/',
            to: '/index.html',
          },
          {
            from: /./,
            to: '/index.html',
          },
        ],
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
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: NODE_ENV === 'development',
              },
            },
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css',
        chunkFilename: 'styles.css',
      }),
    ],
  };
};
