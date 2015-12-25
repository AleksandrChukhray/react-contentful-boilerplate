var path = require('path');
var webpack = require('webpack');

var publicPath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/'
  : '/static/dist';

var jsxLoaders = process.env.NODE_ENV === 'development'
  ? ['react-hot', 'babel-loader']
  : ['babel-loader'];

var plugins = [
  new webpack.EnvironmentPlugin('NODE_ENV', 'SERVER_URL'),
  new webpack.IgnorePlugin(/vertx/)
];

// Minifier / uglifier
var minifier = new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false
    // drop_console: false (default)
    // Stripping `console` statements is handled by strip-loader, which gives
    // us more control over `console.log`, `console.error`, etc in production.
  }
});

// Prepare React for production by stripping out warnings and other
// dev-only code paths. See http://git.io/vROdo and
// https://facebook.github.io/react/downloads.html#npm
var reactProdMode = new webpack.DefinePlugin({
  'process.env': {
    // This has effect on the react lib size
    NODE_ENV: JSON.stringify('production')
  }
});

if (process.env.NODE_ENV !== 'development') {
  plugins.push(minifier);
  plugins.push(reactProdMode);
}


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
  plugins: plugins
};
