const Pesquisa = require('../models/pesquisas');

module.exports = app => {
  app.get('/pesquisas', (req, res) => res.send('Get das pesquisas'));

  app.post('/pesquisas', (req, res) => {
    const pesquisa = req.body;
    Pesquisa.adiciona(pesquisa);
    res.send('POST da Pesquisa');
  }) 
}