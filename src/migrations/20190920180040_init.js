exports.up = async (knex, Promise) => {
  await knex.schema.createTable('users', table => {
    table.increments('id').notNullable();
    table.text('discord_id').notNullable();
    table.text('username').notNullable();
    table.text('discriminator').notNullable();
  });

  await knex.schema.createTable('guilds', table => {
    table.increments('id').notNullable();
    table.text('discord_id').notNullable();
    table.text('name').notNullable();
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('guilds');
};
