--- clear database ---
DROP DATABASE IF EXISTS company_db;

--- create database ---
CREATE DATABASE company_db;

--- activate database ---
USE company_db;

--- create departments database ---
CREATE TABLE departments (
  name VARCHAR(30) NOT NULL,
  id INT AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (id)
);

--- create roles database ---
CREATE TABLE roles (
  title VARCHAR(30) NOT NULL,
  id INT AUTO_INCREMENT NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

--- create empoloyees database ---
CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
 