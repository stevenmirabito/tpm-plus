var webpack = require('webpack'),
    path = require('path'),
    env = require('./utils/env'),
    WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: {
    'pobuilder-ext': [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://localhost:' + env.PORT,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src', 'js', 'pobuilder-ext.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'https://localhost:' + env.PORT + '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [ 'style-loader', 'css-loader?modules', "sass-loader", ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    // expose and write env vars to the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WriteFilePlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    https: true,
    port: env.PORT,
    contentBase: path.join(__dirname, "../build"),
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
