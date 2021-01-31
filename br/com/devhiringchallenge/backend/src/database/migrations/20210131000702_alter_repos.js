exports.up = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('full_name');
  });
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropColumn('full_name');
  });
};