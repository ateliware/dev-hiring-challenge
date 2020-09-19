
const githubService = require("./github.service.js")
const dao = require("../dao/repositorio.dao.js")

exports.buscarRepositorios = async (linguagem) => {
  const url = githubService.montarUrl(linguagem);
  await dao.delete(linguagem);

  try{
    const retorno = await githubService.buscarRepositorios(url);

    if (!retorno.data.items && retorno.data.items.length === 0) {
      return Error(`Não foi encontrado nenhum item para a linguagem '${linguagem}'`)
    }

    await retorno.data.items.map(item => dao.create(item));

    return await dao.read(linguagem);
  } catch (e) {
    console.log("Erro de execução: ", e)
    throw Error(`Erro ao buscar repositórios da linguagem '${linguagem}'`);
  }
}