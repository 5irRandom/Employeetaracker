DROP DATABASE IF EXISTS bigsandDB;

CREATE DATABASE bigsandDB;

USE bigsandDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL default 0,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
--   FOREIGN KEY (manager_id) REFERENCES commented as there is no use for this
);



-- -- ### Alternative way to insert more than one row
-- INSERT INTO bids (product, currentBid, quantity)
-- VALUES ("30 gallons of mayonnaise", 47.32, 1);
