module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.NODE_ENV === 'development' ? process.env.DB_USER_DEV : process.env.DB_USER_PROD,
  password: process.env.NODE_ENV === 'development' ? process.env.DB_PASS_DEV : process.env.DB_PASS_PROD,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
