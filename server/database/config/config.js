module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_BASE,
        host: 'localhost',
        dialect: 'postgres',
    },
    test: {
        username: 'postgres',
        password: null,
        database: 'ateliware_test',
        host: 'localhost',
        dialect: 'postgres',
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_BASE,
        host: process.env.POSTGRES_URL,
        dialect: 'postgres',
    }
};

