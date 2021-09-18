--- view all departments
SELECT id AS id, 
name AS department 
FROM departments;

--- view all roles
SELECT roles.id AS id, 
roles.title as title, departments.name AS department, 
roles.salary AS salary 
FROM roles 
LEFT JOIN departments 
ON roles.department_id = departments.id;


--- view all employees
SELECT employees.id AS id, 
employees.first_name AS first_name, 
employees.last_name AS last_name, 
roles.title AS title, 
departments.name AS department, 
roles.salary AS salary, 
CONCAT(manager.first_name, " ", manager.last_name) AS manager 
FROM employees 
LEFT JOIN roles 
ON employees.roles_id = roles.id 
LEFT JOIN departments 
ON roles.department_id = departments.id 
LEFT JOIN employees manager 
ON manager.id = employees.manager_id
