const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||'postgres://qojlynljijjrie:1bce63874572666a4db8329832d17a74d60bba2c4b3c8a9cb356dfdd256458c1@ec2-54-146-4-66.compute-1.amazonaws.com:5432/d95tsau9p40a5',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};