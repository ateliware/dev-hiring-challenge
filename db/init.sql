CREATE DATABASE ateliware;
use ateliware;

CREATE TABLE REPOSITORIE (
    ID int NOT NULL AUTO_INCREMENT,
    OWNER varchar(255),
    URL varchar(255),
    LANGUAGE varchar(255),
    CREATED_AT DATE,
    UPDATED_AT DATE,
    STARGAZER int,
    RELEASES int,
    PRIMARY KEY (ID)
);