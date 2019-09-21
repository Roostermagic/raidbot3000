const { RichEmbed } = require('discord.js');
const voca = require('voca');
const moment = require('moment');

const knex = require('../knex');
const utils = require('../util/utils');

const guildEmojis = message => message.guild.emojis;
const tankEmoji = emojis => emojis.find('name', 'tank');
const healerEmoji = emojis => emojis.find('name', 'healer');
const dpsEmoji = emojis => emojis.find('name', 'dps');

const title = 'Raid signup';
const placeholderSignup = 'No one has signed up yet!';

const createEmbed = (message, title, description) => {
  const emojis = guildEmojis(message);

  const embed = new RichEmbed()
    .setTitle(title)
    .setDescription(description)
    .addBlankField()
    .addField(`${tankEmoji(emojis)}`, placeholderSignup)
    .addField(`${healerEmoji(emojis)}`, placeholderSignup)
    .addField(`${dpsEmoji(emojis)}`, placeholderSignup)
    .addBlankField();

  return embed;
};

// '!raid '
const parseDescription = message => voca.slice(message.content, 6, message.content.length);

const createSignup = async message => {
  const desc = parseDescription(message);

  if (!validateMessage(message)) return;

  const embed = createEmbed(message, title, desc);

  const date = utils.getDate(desc);

  await knex('raids').insert({ description: 'description', date: moment(date, 'DD.MM.YYYY').toDate() });

  message.channel.send(embed).then(m => {
    const emojis = guildEmojis(message);

    m.react(tankEmoji(emojis));
    m.react(healerEmoji(emojis));
    m.react(dpsEmoji(emojis));
  });
};

const validateMessage = message => {
  const desc = parseDescription(message);
  const date = utils.getDate(desc);

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.send("you don't have permission to do that dave");
    return false;
  }

  if (!date || !moment(date, 'DD.MM.YYYY').isValid() || !moment(date, 'DD.MM.YYYY').isAfter()) {
    message.channel.send('check the date pls >:(');
    return false;
  }

  return true;
};

const addUserToEmbedField = (message, embeddedMessage, fieldName, userName) => {
  const index = embeddedMessage.fields.findIndex(element => element.name === fieldName);
  let field = Object.assign({}, embeddedMessage.fields[index]);

  if (field.value === placeholderSignup) field.value = userName;
  else field.value += `, ${userName}`;
  embeddedMessage.fields[index] = field;

  embeddedMessage.fields.forEach(field => {
    field.embed = null;
  });

  const editedEmbed = new RichEmbed({
    title: embeddedMessage.title,
    description: embeddedMessage.description,
    fields: embeddedMessage.fields
  });

  message.edit(editedEmbed);
};

const addSignup = (messageReaction, user) => {
  if (user.username === 'raidbot3000') return;
  const message = messageReaction.message;

  const embeddedMessage = message.embeds[0];
  if (!embeddedMessage || embeddedMessage.type !== 'rich') return;

  const emojis = guildEmojis(message);
  const reactionEmoji = messageReaction.emoji.name;

  switch (reactionEmoji) {
    case 'tank':
      addUserToEmbedField(message, embeddedMessage, `${tankEmoji(emojis)}`, user.username);
      break;
    case 'healer':
      addUserToEmbedField(message, embeddedMessage, `${healerEmoji(emojis)}`, user.username);
      break;
    case 'dps':
      addUserToEmbedField(message, embeddedMessage, `${dpsEmoji(emojis)}`, user.username);
      break;
  }
};

const removeUserFromEmbedField = (message, embeddedMessage, fieldName, userName) => {
  const index = embeddedMessage.fields.findIndex(element => element.name === fieldName);
  let field = Object.assign({}, embeddedMessage.fields[index]);

  const users = field.value.split(',').map(name => name.trim());
  const usersRemoved = users.filter(user => user !== userName);
  if (usersRemoved.length === 0 || usersRemoved === placeholderSignup) field.value = placeholderSignup;
  else field.value = usersRemoved.join(', ');

  embeddedMessage.fields[index] = field;

  embeddedMessage.fields.forEach(field => {
    field.embed = null;
  });

  const editedEmbed = new RichEmbed({
    title: embeddedMessage.title,
    description: embeddedMessage.description,
    fields: embeddedMessage.fields
  });

  message.edit(editedEmbed);
};

const removeSignup = (messageReaction, user) => {
  const message = messageReaction.message;
  const embeddedMessage = message.embeds[0];
  if (!embeddedMessage || embeddedMessage.type !== 'rich') return;

  const emojis = guildEmojis(message);
  const reactionEmoji = messageReaction.emoji.name;

  switch (reactionEmoji) {
    case 'tank':
      removeUserFromEmbedField(message, embeddedMessage, `${tankEmoji(emojis)}`, user.username);
      break;
    case 'healer':
      removeUserFromEmbedField(message, embeddedMessage, `${healerEmoji(emojis)}`, user.username);
      break;
    case 'dps':
      removeUserFromEmbedField(message, embeddedMessage, `${dpsEmoji(emojis)}`, user.username);
      break;
  }
};

module.exports = { createSignup, addSignup, removeSignup };
