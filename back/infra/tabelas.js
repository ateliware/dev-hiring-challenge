class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarTabelaPesquisa();
  }
  criarTabelaPesquisa() {
    const sql = 'CREATE TABLE IF NOT EXISTS Pesquisas (id int NOT NULL AUTO_INCREMENT, nome_repo varchar(40) NOT NULL, PRIMARY KEY(id))';
    this.conexao.query(sql, erro => {
      if(erro) {
        console.log(erro);
      } else {
        console.log('Tabela de pesquisa criada com sucesso!');
      }
    });
  }
}

module.exports = new Tabelas;