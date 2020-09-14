import dao from "../dao/repositorio.dao.js"
import githubService from "./github.service.js"

export default {
  buscarRepositorios(linguagem) {
    this.buscarRepositoriosNoGitHub(linguagem)
      .then(response => {
        return this.verificarRetorno(response);
      })
      .catch(() => {
        throw Error(`Erro ao buscar repositórios da linguagem '${linguagem}'`);
      })
  }, 

  verificarRetorno(retorno) {
    retorno.data.items.map(item => dao.create(item));

    return true;
  },

  buscarRepositoriosSalvos() {
    dao.read();
  },

  buscarRepositoriosNoGitHub(linguagem) {
    const url = githubService.montarUrl(linguagem);
    return githubService.buscarRepositorios(url)
  }
}
