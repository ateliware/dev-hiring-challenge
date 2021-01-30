
exports.up = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('language');
    table.string('descriṕtion', 10000);
  });
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropColumn('language');
  });
};