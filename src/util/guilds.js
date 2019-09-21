const knex = require('../knex');

const getGuildId = async message => {
  const guild = message.channel.guild;
  if (!guild) {
    message.author.send("Guild-specific commands can't be used in private chats");
    return null;
  }
  const [guildId] = await knex('guilds')
    .pluck('id')
    .where('discord_id', guild.id);

  if (!guildId) {
    const [guildId] = await knex('guilds')
      .insert({
        discord_id: guild.id,
        name: guild.name
      })
      .returning('id');

    return guildId;
  }
  return guildId;
};

module.exports = { getGuildId };
