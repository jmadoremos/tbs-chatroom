import path from 'path';

export default {
  entry: './app/web/index/index.viewModel.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/web/index'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};
