CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(100) NOT NULL UNIQUE, name VARCHAR(60) NOT NULL, token varchar(100), date_token TIMESTAMP,
                   typeUserId int, FOREIGN KEY(typeUserId) REFERENCES types_users(id));
