var path = require('path');
var webpack = require('webpack');

var publicPath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/'
  : '/static/dist';

var jsxLoaders = process.env.NODE_ENV === 'development'
  ? ['react-hot', 'babel-loader']
  : ['babel-loader'];

module.exports = {
  entry: './app/browser.js',
  output: {
    path: path.join(__dirname, 'static/dist'),
    publicPath: publicPath,
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        include: /\/app\//, 
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV', 'SERVER_URL'),
    new webpack.IgnorePlugin(/vertx/)
  ]
};
