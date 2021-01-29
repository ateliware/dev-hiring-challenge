
exports.up = function(knex) {
  knex.schema.createTable('repos' , function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('repos')
};
