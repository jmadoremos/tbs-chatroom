import express from 'express';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import compression from 'compression';
import chalk from 'chalk';

import IndexRouter from '../app/web/index/index.router';

/* eslint-disable no-console */

const port = 9428;
const compiler = webpack(config);
const app = express();
const pid = process.pid;

// compressing all request will save bandwith and induce
// faster initial load
app.use(compression({level: 6}));

// inserting webpack middleware allows it to compile all
// .js and .css files into bundles
app.use(require('webpack-dev-middleware')(compiler, { publicPath: config.output.publicPath }));

// handling routes using express.Router makes passing paths
// easier and cleaner
app.use('/', IndexRouter);

// finally, let express listen to a specific port
// to present our web application
app.listen(port, function(err) {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.yellow(`Running a new process at ${pid}`));
    open('http://localhost:' + port);
  }
});
