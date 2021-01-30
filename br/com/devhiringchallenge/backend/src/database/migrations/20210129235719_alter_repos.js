exports.up = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.integer('stars').unsigned();
    table.string('description', 1000).alter();
  });
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropColumn('stars');
    table.string('description').alter();
  });
};