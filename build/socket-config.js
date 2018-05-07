import chalk from 'chalk';

function SocketConfig() {
  function onConnect(socket) {
    var mIsAdded = false;

    socket.on('set-user', (obj) => {
      if (!mIsAdded) {
        socket.name = obj.name;
        socket.email = obj.email;
        socket.emailHash = obj.emailHash;
        mIsAdded = true;

        // inform other clients
        socket.broadcast.emit('add-user', {
          name: socket.name,
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.name} has connected`));
      }
    });

    socket.on('send-message', (obj) => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('new-message', {
          name: socket.name,
          email: socket.email,
          emailHash: socket.emailHash,
          message: obj.message
        });

        // log
        console.log(chalk.green(`${socket.name} has sent a message "${obj.message}"`));
      }
    });

    socket.on('start-typing', () => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('start-typing', {
          name: socket.name,
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.name} is typing...`));
      }
    });

    socket.on('stop-typing', () => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('stop-typing', {
          name: socket.name,
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
          name: socket.name,
          email: socket.email,
          emailHash: socket.emailHash
        });

        // log
        console.log(chalk.green(`${socket.name} has disconnected`));
      }
    });
  }

  // finalize SocketConfig object
  return { onConnect: onConnect };
}

module.exports = new SocketConfig();
