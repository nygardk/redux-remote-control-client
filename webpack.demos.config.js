var webpack = require('webpack');
var path = require('path');

var ENV = process.env.NODE_ENV;

module.exports = {
  debug: true,
  devtool: '#inline-source-map',
  entry: {
    demo0: [
      'normalize.css',
      './demos/demo0/main.styl',
      './demos/demo0/index.jsx',
    ],
  },
  contentBase: './demos',
  output: {
    filename: '[name]/bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'demos'),
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules|lib/
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ENV === 'development'
          ? ['react-hot', 'babel']
          : ['babel'],
        exclude: /node_modules|lib/,
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif)[\?]?.*$/,
        loader: 'url-loader?limit=1',
        exclude: /node_modules|lib/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus'],
      },
    ],
  },
  resolve: {
    root: [path.resolve('./src')],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: ENV === 'development'
    ? [new webpack.HotModuleReplacementPlugin()]
    : [],
  eslint: { configFile: '.eslintrc' },
  node: {
    fs: 'empty',
  },
};
