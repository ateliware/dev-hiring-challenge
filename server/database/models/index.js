require('dotenv').config({path: './../../../.env'});
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/config');
const basename = path.basename(__filename);
const config = envConfigs[process.env.NODE_ENV];
const db = {};

console.log(config)
let conStringPost = 'postgres://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database;
let sq = new Sequelize(conStringPost);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sq['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sq;
db.Sequelize = Sequelize;

module.exports = db;
