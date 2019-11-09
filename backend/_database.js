const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize = undefined

process.env.DATABASE_URL ? 
  sequelize = new Sequelize(process.env.DATABASE_URL) :
  sequelize = new Sequelize({
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USER_DB,
    password: process.env.PASS,
    port: process.env.PORT_DB,
    dialect: 'postgres',
    logging: true,
  });  

module.exports = sequelize

// Test DB Conenction //
async function test(){
  try{
      let result = await sequelize.authenticate()
      console.log("Successful database connection")
  }
  catch(error){
      console.error("Error on database connection:")
      console.error(error)
      process.exit()
  }
}

test()
