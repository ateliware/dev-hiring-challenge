import mysql from 'mysql';

const dbConf = {
  host: "localhost",
  user: "root",
  password: "repositorios",
  database: "repositorios"
};

const dbConn = mysql.createConnection(dbConf);


export default {
  create(item) {
    const insert = `
    INSERT INTO repositorio (
      nome, 
      proprietario, 
      descricao , 
      url, 
      linguagem, 
      forks,
      issues , 
      estrelas, 
      seguidores, 
      privado) 
    VALUES (
      ${item.name}, 
      ${item.owner.id}, 
      ${item.description}, 
      ${item.html_url}, 
      ${item.language}, 
      ${item.forks}, 
      ${item.open_issues}, 
      ${item.stargazers_count}, 
      ${item.watchers},
      ${item.private})`;

      dbConn.connect((err) => {
        if (err) {
          throw err;
        }
        
        dbConn.query(insert, (err, result) => {
          if (err) {
            throw err;
          }
    
          console.log("Item inserido com sucesso ", result); 
          return true;
        })
    })

    dbConn.end();
  },

  delete(linguagem) {
    const del = `DELETE FROM repositorio WHERE linguagem = ${linguagem}`;

    dbConn.connect((err) => {
      if (err) {
        throw err;
      }

      dbConn.query(del, (err, result) => {
        if (err) {
          throw err;
        }
  
        console.log("Itens deletados com sucesso ", result); 
        return true;
      })
    })

    dbConn.end();
  },

  read(linguagem) {
    const sql = `SELECT * FROM repositorio WHERE linguagem = ${linguagem}`

    dbConn.connect((err) => {
      if (err) {
        throw err;
      }
      
      dbConn.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
  
        console.log("Item inserido com sucesso ", result); 
        return result;
      }
    )
  })
  dbConn.end();
  }, 
}