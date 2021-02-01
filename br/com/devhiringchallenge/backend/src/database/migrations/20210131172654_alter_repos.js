
exports.up  = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropPrimary();
    table.string('id').primary();
  })
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropPrimary();
    table.dropColumn('id');
    table.string('url').primary();
  })
};
