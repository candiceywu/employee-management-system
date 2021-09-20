--- clear database ---
DROP DATABASE IF EXISTS company_db;

--- create database ---
CREATE DATABASE company_db;

--- activate database ---
USE company_db;

--- create departments database ---
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

--- create roles database ---
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  department_id INT,
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id) 
  ON DELETE SET NULL
);

--- create empoloyees database ---
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  FOREIGN KEY (roles_id)
  REFERENCES roles(id) ON DELETE SET NULL,
  manager_id INT, 
  CONSTRAINT fk_managers,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);