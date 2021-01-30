
exports.up = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropColumn('stars');
  });
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('stars');
  });
};