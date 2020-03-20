CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(100) NOT NULL UNIQUE, name VARCHAR(60) NOT NULL, password VARCHAR(200) NOT NULL,
                   token varchar(100), date_token TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   type_user_id int, FOREIGN KEY(type_user_id) REFERENCES types_users(id));
