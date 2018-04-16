import chalk from 'chalk';

function SocketConfig() {
  function onConnect(socket) {
    console.log(chalk.green(`user connected with ID ${socket.id}`));

    socket.on('disconnect', () => {
      console.log(chalk.green(`user disconnected with ID ${socket.id}`));
    });
  }
  // finalize SocketConfig object
  return { onConnect: onConnect };
}

module.exports = new SocketConfig();
