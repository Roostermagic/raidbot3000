const Discord = require('discord.js');

const client = new Discord.Client();
const { messages } = require('./util');
const { signups } = require('./modules');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
  if (!message.author.bot) {
    messages.handleMessage(message);
  }
});

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (messageReaction.message.author.id !== client.user.id) return;
  signups.addSignup(messageReaction, user);
});

client.on('messageReactionRemove', async (messageReaction, user) => {
  if (messageReaction.message.author.id !== client.user.id) return;
  signups.removeSignup(messageReaction, user);
});

module.exports = client;
