
const githubService = require("./github.service.js")
const dao = require("../dao/repositorio.dao.js")

const UNPROCESSABLE_ENTITY = 422

module.exports = {

  async buscarRepositorios(linguagem) {
    const repositoriosGithub = await this.buscarRepositorioGithub(linguagem);
    
    if (!repositoriosGithub) {
      console.log ("Tentativa para verificar se já existe algum registro com a linguagem ", linguagem);
      return await this.buscarRepositoriosDB(linguagem);
    }
    
    await this.atualizarDB(linguagem, repositoriosGithub);

    return await this.buscarRepositoriosDB(linguagem);
  },


  async atualizarDB(linguagem, repositoriosGithub) {
    await dao.delete(linguagem);    

    await Promise.all(repositoriosGithub.map(item => dao.create(item)));
  },


  async buscarRepositoriosDB(linguagem) {
    return await dao.read(linguagem);
  },


  async buscarRepositorioGithub(linguagem) {
    const url = githubService.montarUrl(linguagem);
    try {
      const repositoriosEncontrados =  await githubService.buscarRepositorios(url);

      return repositoriosEncontrados.data.items;
    } catch(e) {
      if (e.response.status === UNPROCESSABLE_ENTITY) {
        throw Error(`Erro ao buscar repositórios da linguagem '${linguagem}'`);
      }

      return null;
    }
  }
}