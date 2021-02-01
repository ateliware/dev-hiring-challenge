
exports.up  = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = async (knex) => {
  return knex.schema.table('repos' , function(table) {
    table.dropForeign('user_id')
    table.dropColumn('user_id');
  })
};
