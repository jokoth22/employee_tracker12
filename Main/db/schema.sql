DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department,roles,employee;

CREATE TABLE department (
    id INT NOT NULL auto_increment,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL auto_increment,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department (id)
  ON DELETE SET NULL, 
  PRIMARY KEY (id)
);


CREATE TABLE employee (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee (id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);