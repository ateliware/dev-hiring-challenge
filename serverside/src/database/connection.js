const knex = require("knex");
const configuration = require("../../knexfile");
require('dotenv/config');

const config = (process.env.NODE_ENV == 'test') ? configuration.test : (process.env.NODE_ENV == 'development') ? configuration.development : configuration.production;

const connection = knex(config);

module.exports = connection;