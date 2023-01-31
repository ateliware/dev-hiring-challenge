CREATE TABLE IF NOT EXISTS repositories (
    id integer auto_increment,
    _id integer not null,
    `language` varchar(100),
    full_name varchar(100) not null,
    description text,
    url varchar(100),
    license varchar(100),
    homepage varchar(100),
    stars integer,
    PRIMARY KEY(id)
);