require('dotenv/config');

const express = require('express');
const cors = require('cors');
const git = require('./controllers/gitControllers');

const app = express();

app.use(express.json());
app.use(cors());

app.route('/repos')
  .get(git.getAllRepos)
  .post(git.postRepos)
  .delete(git.deleteAllRepos);

const port = process.env.PORT;

app.get('/', (req, res) => res.send(`<h1>Executando na porta ${port}</h1>`));

module.exports = app.listen(port);
