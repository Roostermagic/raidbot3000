const { signups } = require('../modules');

const help = require('./help');

const handleMessage = async message => {
  // Words with separators, for commands
  const messageContent = message.content.toLowerCase().split(' ');

  switch (messageContent[0]) {
    case '!raid':
      signups.createSignup(message);
      break;
    case '!help':
      help.sendHelp(message);
      break;
    default:
      break;
  }
};

module.exports = { handleMessage };
