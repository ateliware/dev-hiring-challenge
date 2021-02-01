exports.up = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('description', 10000).alter();
  });
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('description', 1000).alter();
  });
};