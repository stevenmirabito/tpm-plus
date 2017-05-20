var webpack = require('webpack'),
    env = require('./utils/env'),
    path = require('path');

module.exports = {
  entry: {
    'content_scripts': [
      'babel-polyfill',
      path.join(__dirname, 'src', 'js', 'content_scripts.js'),
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
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    // expose and write env vars to the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
  ],
};
