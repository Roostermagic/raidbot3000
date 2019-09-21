exports.up = async function(knex, Promise) {
  await knex.schema.createTable('raids', table => {
    table.increments('id').primary();
    table.text('description');
    table.dateTime('date').notNull();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('raids');
};
