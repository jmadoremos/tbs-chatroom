'use strict'

import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'app/web/index/index.view')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'app/web/index'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      }
    ]
  }
}
