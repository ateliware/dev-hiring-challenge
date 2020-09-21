const conexao = require('../infra/conexao');

class Pesquisa {
  adiciona(pesquisa) {
    const sql = 'INSERT INTO Pesquisas SET ? ';
    conexao.query(sql, pesquisa, (erro, resultados) => {
      if(erro) {
        console.log(erro);
      } else {
        console.log(resultados);
      }
    });
  }
}

module.exports = new Pesquisa;