const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.host,
  database: process.env.database,
  username: process.env.user,
  password: process.env.password,
  port: process.env.port_db,
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
