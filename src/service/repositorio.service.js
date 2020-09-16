
import dao from "../dao/repositorio.dao.js"
import githubService from "./github.service.js";

export default {
  buscarRepositorios(linguagem) {
    const url = githubService.montarUrl(linguagem);
    return githubService.buscarRepositorios(url)
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

  buscarRepositoriosSalvos(linguagem) {
    return dao.read(linguagem);
  },
}
