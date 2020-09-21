const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect(erro => {
  if (erro) {
    console.log(erro);
  } else {
    console.log('Conectado com sucesso!');
    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3001, () => console.log('servidor rodando na porta 3001'));
  }
});