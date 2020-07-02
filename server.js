const {createServer} = require('http')
const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;
const table ='search_results';

app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); 
app.use(bodyParser({limit: '50mb'}));
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));

app.use(express.static(path.resolve(__dirname, 'build')));

let config = {
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'b96f2a4d4f5f9d',
  password: 'e7172e58',
  database: 'heroku_dc8fe8c35b14859',
};

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.post('/api/save_results', (req, res) => {

    let connection = mysql.createConnection(config);
    
    let todos = [];
    let max_search_id;

    //Search_ID é um identificador unico de cada pesquisa... Primeiro eu pego o com o maior valor 
    //Para incrementar no proximo insert...
    let select_query = `SELECT MAX(search_id) as Search_id FROM ${table}`

    connection.query(select_query, (error, results, fields) => {
        if(error){
            return console.error(error.message);
        }
        max_search_id = results[0].Search_id + 1;
        console.log(max_search_id)
        
        for(let i = 0; i < req.body.length; i++){
            //Adiciono todos em um unico array
            todos.push([
                req.body[i].id, 
                max_search_id,
                req.body[i].node_id,
                req.body[i].name, 
                req.body[i].full_name,  
                req.body[i].private,
                req.body[i].html_url, 
                req.body[i].url, 
                req.body[i].stargazers_count, 
                req.body[i].language
            ])
        
        }

        //Assim é possível enviar para o banco todos de uma única vez...
        let query = `insert into ${table} 
        (repository_id, search_id, node_id, name, full_name, private, html_url, url, stargazers_count, language)
        values ? `

        connection.query(query, [todos], (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Linhas inseridas:" + results.affectedRows);
            connection.end();
        });

    });   
   

  });

  const server = createServer(app)

  server.listen(PORT, () => {
    console.log(`App server now listening to port ${PORT}`);
  });
  
