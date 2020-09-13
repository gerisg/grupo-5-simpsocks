-- Create user and gran privileges
CREATE USER 'simpsocks'@'localhost' IDENTIFIED BY 'S1mps0ck$';
GRANT ALL PRIVILEGES ON simpsocks_dev . * TO 'simpsocks'@'localhost';
FLUSH PRIVILEGES;

-- Create database
CREATE DATABASE simpsocks_dev charset utf8mb4 collate utf8mb4_unicode_ci;
USE simpsocks_dev;

-- Create users table
CREATE TABLE users (
	id INT(11) NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    phone VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT(11) NOT NULL DEFAULT 1,
    PRIMARY KEY (id) 
);

-- Create roles table
CREATE TABLE roles (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Add relation user-rol
ALTER TABLE users ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id);

-- Create addresses table
CREATE TABLE addresses (
	id INT(11) NOT NULL AUTO_INCREMENT,
    street VARCHAR(255) NOT NULL,
    number INT(11) NOT NULL,
    city VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
	user_id INT(11) NOT NULL,
    PRIMARY KEY (id)
);

-- Add relation user-address
ALTER TABLE addresses ADD CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users(id);