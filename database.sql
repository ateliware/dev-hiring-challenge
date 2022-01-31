-- CREATE DATABASE historic_database;

--\c into historic_database

CREATE TABLE hist(
    hist_id SERIAL PRIMARY KEY,
    language VARCHAR(255),
    owner VARCHAR(255),
    title VARCHAR(255),
    description TEXT
);