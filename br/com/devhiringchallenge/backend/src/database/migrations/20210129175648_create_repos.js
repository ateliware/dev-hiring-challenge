
exports.up = async (knex) => {
  return knex.schema.createTable('repos' , function(table) {
    table.string('url').primary();
    table.string('name').notNullable();
    table.string('description');
    table.string('stars').notNullable();
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('repos');
};