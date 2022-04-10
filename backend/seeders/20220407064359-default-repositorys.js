'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{
    //verificando se ja existe um registro
    const repositoryId = await queryInterface.rawSelect('repos', {where:{}, limit:1}, ['id'])
    if(!repositoryId){
      return queryInterface.bulkInsert('repos',[{
      login:'evalente82',
      html_url: 'https://github.com/evalente82',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }
},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('repos', null,{})
  }
};
