--- clear database ---
DROP DATABASE IF EXISTS company_db;

--- create database ---
CREATE DATABASE company_db;

--- activate database ---
USE company_db;

--- create departments database ---
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

--- create roles database ---
CREATE TABLE roles (
  title VARCHAR(30) NOT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

--- create empoloyees database ---
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  department VARCHAR(30) NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (roles_id)
  REFERENCES roles(id),
  FOREIGN KEY manager_id 
  REFERENCES employees(id)
);
 