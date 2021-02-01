
exports.up = async (knex) => {
  return knex.schema.createTable('users' , function(table) {
    table.string('id').primary();
    table.string('login').notNullable();
    table.string('avatar_url');
    table.string('url').notNullable();
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('users');
};