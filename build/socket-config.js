import chalk from 'chalk';
import SocketSession from './socket-session';

function SocketConfig() {
  function onConnect(socket) {
    var mIsAdded = false;

    socket.on('set-user', (obj) => {
      if (!mIsAdded) {
        obj.id = socket.id || '';
        SocketSession.setUserDetails(obj);
        mIsAdded = true;

        // log
        console.log(chalk.green(`${SocketSession.user.name} has connected`));
      }
    });

    socket.on('send-message', (obj) => {
      if (mIsAdded) {
        // inform other clients
        socket.broadcast.emit('new-message', {
          name: SocketSession.user.name,
          message: obj.message
        });

        // log
        console.log(chalk.green(`${SocketSession.user.name} has sent a message "${obj.message}"`));
      }
    });

    socket.on('disconnect', () => {
      if (mIsAdded) {
        SocketSession.close();
        mIsAdded = false;

        // log
        console.log(chalk.green(`${SocketSession.user.name} has disconnected`));
      }
    });
  }

  // finalize SocketConfig object
  return { onConnect: onConnect };
}

module.exports = new SocketConfig();
