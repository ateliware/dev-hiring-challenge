var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "repositorios",
  database: "repositorios"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  const createTable = "CREATE TABLE IF NOT EXISTS repositorio (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(255), proprietario VARCHAR(255), descricao VARCHAR(255), url VARCHAR(255), linguagem VARCHAR(255), forks INT, issues INT, estrelas INT, seguidores INT, privado boolean, CONSTRAINT repositorio_pk PRIMARY KEY (id)) ";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
