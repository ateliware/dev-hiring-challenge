
exports.up = function (knex) {
    return knex.schema.createTable('github_repositories', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('language').notNullable();
        table.string('search').notNullable();
        table.string('html_url').notNullable();
        table.string('description').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('github_repositories');
};
