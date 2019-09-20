const { RichEmbed } = require('discord.js');
const voca = require('voca');

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

const createSignup = message => {
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.send("you don't have permission to do that dave");
    return;
  }

  const embed = createEmbed(message, title, parseDescription(message));
  message.channel.send(embed);
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

const removeUserFromEmbedField = (message, embeddedMessage, userName) => {
  embeddedMessage.fields.forEach(field => {
    const users = field.value.split(',').map(name => name.trim());
    const usersRemoved = users.filter(user => user !== userName);
    if (usersRemoved.length === 0 || usersRemoved === placeholderSignup) field.value = placeholderSignup;
    else field.value = usersRemoved.join(', ');
  });

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

  removeUserFromEmbedField(message, embeddedMessage, user.username);
};

module.exports = { createSignup, addSignup, removeSignup };
