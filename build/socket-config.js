import chalk from 'chalk';

function SocketConfig() {
  function onConnect(socket) {
    var mIsAdded = false;

    socket.on('set-user', (obj) => {
      if (!mIsAdded) {
        socket.email = obj.email;
        socket.emailHash = obj.emailHash;
        mIsAdded = true;

        // inform other clients
        socket.broadcast.emit('add-user', {
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.email} has connected`));
      }
    });

    socket.on('send-message', (obj) => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('new-message', {
          email: socket.email,
          emailHash: socket.emailHash,
          message: obj.message
        });

        // log
        console.log(chalk.green(`${socket.email} has sent a message "${obj.message}"`));
      }
    });

    socket.on('start-typing', () => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('start-typing', {
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.email} is typing...`));
      }
    });

    socket.on('stop-typing', () => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('stop-typing', {
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.name} stopped typing...`));
      }
    });

    socket.on('disconnect', () => {
      if (mIsAdded) {
        mIsAdded = false;

        socket.broadcast.emit('remove-user', {
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.email} has disconnected`));
      }
    });
  }

  // finalize SocketConfig object
  return { onConnect: onConnect };
}

module.exports = new SocketConfig();
