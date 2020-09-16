
import axios from "axios"
import githubService from "./github.service.js";

export default {
  buscarRepositorios(linguagem) {
    const url = githubService.montarUrl(linguagem);
    return githubService.buscarRepositorios(url)
      .then(response => {
        return this.verificarRetorno(response, linguagem);
      })
      .catch((err) => {
        console.log(err)
        throw Error(`Erro ao buscar repositórios da linguagem '${linguagem}'`);
      })
  }, 

  verificarRetorno(retorno, linguagem) {
    dao.delete(linguagem);
    retorno.data.items.map(item => dao.create(item));

    return true;
  },

  buscarRepositoriosSalvos(linguagem) {
    return dao.read(linguagem);
  },
}
