'use strict'

const express = require('express')
const mysql = require('mysql')
const path = require('path')
const serveStatic = require('serve-static')

// Constants
const PORT = process.env.PORT
const HOST = '0.0.0.0'

// DB
let con = createConnection()

function createConnection() {
  return mysql.createConnection({
    host: process.env.APP_ENV === 'dev' ? "db" : "us-cdbr-iron-east-05.cleardb.net",
    user: process.env.APP_ENV === 'dev' ? "user" : "b2410c064cd71a",
    password: process.env.APP_ENV === 'dev' ? "123456" : "05e06185",
    database: process.env.APP_ENV === 'dev' ? "test_db" : "heroku_d98b70fed13d7b3"
  })
}

function connectDB() {
  con.connect(function(err) {
    if (err) console.log(err)
    console.log("Connected!")
  })
}

function handleError() {
  con.on('error', (err) => {
    if(!err.fatal) return
  
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect to DB...')
      con = createConnection() // refresh connection object
      handleError() // Re-bind the error handling to new object
      connectDB() // try to connect again
    }
  })

}

handleError()
connectDB()


// App
const app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(express.json())
app.use(function(req, res, next) { // not good since basically allows CSRF, but i'm using for testing dev
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/**
 * Saves the repositories in the DB, each language having it's own table
 * First tries to create the table, if it fails, just truncate its data.
 * Then adds the new repos
 */
app.post('/', (req, res) => {
  if(!req.body.lang) // simple check
    return res.send({msg: 'Incorrect data format'})

  let sql_create_table = "CREATE TABLE " + req.body.lang +
                "(id int not null primary key, " +
                "name varchar(100) not null, " +
                "star_count int not null, " +
                "url varchar(200) not null, " +
                "created_at timestamp not null default now())"
  con.query(sql_create_table, (err, result) => {
    if(err)
      if(err.code === 'ER_TABLE_EXISTS_ERROR')
        con.query('TRUNCATE TABLE ' + req.body.lang, (err, result) => {
          if(err)
            console.log(err)
          // Proper handling would go here, but for now just do nothing
        })
      else
        console.log(err)
    else
        console.log(result)

    insertRepo(req.body.lang, req.body.repos)
    .then(data => {
      console.log(data)
      res.send({msg: 'OK'})
    })
    .catch(err => {
      console.log(err)
      res.send({msg: 'write error'})
    })

  })
})

function insertRepo(table, repos) {
  let sql_insert = 'INSERT INTO ' + table + ' (id, name, url, star_count) VALUES ?'
  let values = []
  return new Promise((resolve, reject) => {
    repos.forEach(repo => {
      let repo_values = [
        repo.id,
        repo.name,
        // repo.description,
        repo.html_url,
        repo.stargazers_count
      ]
      values.push(repo_values)
    });
    con.query(sql_insert, [values], (err, result) => {
      if(err) {
        console.log(err)
        reject(err)
      }
      resolve(result)
    })

  })
}


let server = app.listen(PORT, HOST, () => {
  console.log(`Running on port ${PORT}`)
})

module.exports = server