const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const repositorioService = require("./service/repositorio.service.js")

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/repositorios/:linguagem',async (req, res) => {
  return await repositorioService.buscarRepositorios(req.params.linguagem)
    .then(response => res.send(response))
    .catch (err => res.status(400).send(err.message));
})

app.listen(port, () => {
  console.log(`Running`);
})
