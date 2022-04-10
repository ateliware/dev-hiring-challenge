const repoModel = require('../models/repoModels2')
//const Sequelize = require('sequelize')

function getRepoTodos(){    
    return repoModel.findAll();
}

function insertRepo(newRepo) {
    return repoModel.create(newRepo);
}

function getRepoPorId(id) {
    return repoModel.findOne({where: {id}})
}

function deleteRepo(id) {
    return repoModel.destroy({ where: { id } });
}

module.exports = {
    insertRepo,
    getRepoPorId,
    getRepoTodos,
    deleteRepo
}