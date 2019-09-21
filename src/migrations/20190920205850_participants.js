exports.up = async function(knex, Promise) {
  await knex.schema.createTable('participants', table => {
    table.increments('id').primary();
    table.text('role').notNullable();
    table.text('person').notNullable();
    table.text('discord_id').notNullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('participants');
};
