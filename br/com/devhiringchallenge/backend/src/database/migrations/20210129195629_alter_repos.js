
exports.up = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('language');
  });
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropColumn('language');
  });
};