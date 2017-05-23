var webpack = require('webpack'),
    env = require('./utils/env'),
    path = require('path');

module.exports = {
  entry: {
    'pobuilder-ext': [
      'babel-polyfill',
      path.join(__dirname, 'src', 'pobuilder-ext.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
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
        use: [ 'style-loader', 'css-loader?modules', 'sass-loader', ],
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
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
