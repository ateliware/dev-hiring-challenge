const knex = require('knex');
const configuration = require('../../knexfile');
const {attachOnDuplicateUpdate} = require('knex-on-duplicate-update');

attachOnDuplicateUpdate();

const config = process.env.NODE_ENV === 'production' ?
                configuration.production : process.env.NODE_ENV === 'test' ?
                configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;