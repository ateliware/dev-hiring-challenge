const mysql = require('mysql');
const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'biro1234',
  database: 'repos_list',
  insecureAuth : true
});

module.exports = conexao;