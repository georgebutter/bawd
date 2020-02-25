const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const {
  NODE_ENV = 'development',
} = process.env;
console.log(`Running ${NODE_ENV} build`)
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  devtool: 'inline-source-map',
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: NODE_ENV === 'development' ? ['yarn run:dev'] : [],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
