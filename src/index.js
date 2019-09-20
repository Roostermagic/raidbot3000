require('dotenv').config();
const Discord = require('discord.js');

const knex = require('./knex');
const utils = require('./modules/utils');

const client = new Discord.Client();

const token = process.env.DISCORD_TOKEN;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const start = async () => {
  await utils.migrateLatest(knex);
};

start();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
  if (!message.author.bot) {
    utils.handleMessage(message);
  }
});

const login = async () => {
  for (let tries = 0; ; tries++) {
    try {
      client.login(token);
      break;
    } catch (err) {
      if (tries < 10) {
        console.log('Login failed, sleeping');
        sleep(30000);
      } else throw err;
    }
  }
};

login();
