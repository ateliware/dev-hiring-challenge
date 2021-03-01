import { createConnection, ConnectionOptions } from 'typeorm';
import * as PostgressConnectionStringParser from "pg-connection-string";

let connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: "database",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    logging: false,
    entities: ["./src/models/**.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    cli: {
        migrationsDir: "./src/database/migrations"
    }
};

let finalConnOptions = { ...connectionOptions }

if (process.env.DATABASE_URL) {
    const databaseUrl: string = process.env.DATABASE_URL;
    const parsedConnOptions = PostgressConnectionStringParser.parse(databaseUrl);
    finalConnOptions.host = parsedConnOptions.host;
    finalConnOptions.port = parseInt(parsedConnOptions.port);
    finalConnOptions.username = parsedConnOptions.user;
    finalConnOptions.password = parsedConnOptions.password;
    finalConnOptions.database = parsedConnOptions.database;
    finalConnOptions.extra = { ssl: { rejectUnauthorized: false } };
}

if (process.env.NODE_ENV !== 'test') {
    createConnection(finalConnOptions).then(async (conn) => {
        console.log('Running migrations...')
        await conn.runMigrations();
        console.log('Migrations done.')
        console.log('Database connected.')
    });
}
