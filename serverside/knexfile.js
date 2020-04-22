// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/db.sqlite'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/test.sqlite'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true
    },

    production: {
        client: 'postgresql',
        connection: {
            host: 'ec2-54-147-209-121.compute-1.amazonaws.com',
            database: 'd66v1oujmpjijh',
            user: 'wpxtdwjxwipdhv',
            password: 'e9952b098f7ed6d48c1dbf10b949ca17044c5a3d561c6f5ce564d034e2a3c47a',
            ssl: true
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/database/migrations'
        }
    }

};
