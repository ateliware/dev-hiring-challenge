const knex = require('knex');
const configuration = require('../../knexfile');
const {attachOnDuplicateUpdate} = require('knex-on-duplicate-update');

attachOnDuplicateUpdate();

const connection = knex(configuration.development);

module.exports = connection;