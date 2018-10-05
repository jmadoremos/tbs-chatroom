import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import compression from 'compression';
import chalk from 'chalk';

import SocketConfig from './socket-config';
import AppRouter from '../src/app/app.router';

const port = 9428;
const compiler = webpack(config);
const pid = process.pid;
const app = express();
const server = http.Server(app);
const io = socketIO(server, {
  serveClient: false,
  wsEngine: 'ws'
});

// compressing all request will save bandwith and induce
// faster initial load
app.use(compression({level: 6}));

// inserting webpack middleware allows it to compile all
// .js and .css files into bundles
app.use(require('webpack-dev-middleware')(compiler, { publicPath: config.output.publicPath }));

// handling routes using express.Router makes passing paths
// easier and cleaner
app.use('/', AppRouter);

// implementing explicit socket calls and handling them on
// a separate module will lessen the complexity of this module
io.on('connection', SocketConfig.onConnect);

// finally, let express listen to a specific port
// to present our web application
server.listen(port, (err) => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.yellow(`Running a new process at ${pid}`));
  }
});
