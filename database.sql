CREATE DATABASE email_collection;
USE email_collection;

CREATE TABLE emails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);