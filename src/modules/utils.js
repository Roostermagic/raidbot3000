const path = require('path');

const help = require('./help');
const signups = require('./signups');

const migrateLatest = knex => {
  return knex.migrate.latest({
    directory: path.resolve(__dirname, '../migrations')
  });
};

const isInArray = (array, string) => {
  return array.indexOf(string.toLowerCase()) > -1;
};

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

module.exports = { migrateLatest, isInArray, handleMessage };
