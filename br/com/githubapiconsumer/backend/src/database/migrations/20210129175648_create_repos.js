
exports.up = async (knex) => {
  return knex.schema.createTable('repos' , function(table) {
    table.string('id').primary();
    table.string('url');
    table.string('name').notNullable();
    table.integer('stars').unsigned();
    table.string('description', 10000);
    table.string('language');
    table.string('full_name');
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('repos');
};