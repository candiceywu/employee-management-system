INSERT INTO departments (name)
VALUES  ("Research and Development"), 
        ("Legal"), 
        ("Operations"), 
        ("Finance"), 
        ("Marketing");

INSERT INTO roles (title, department_id, salary)
VALUES ("Researcher", 1, 80000), 
       ("Associate", 1, 50000), 
       ("Senior Vice President", 1, 150000), 
       ("General Counsel", 2, 150000),  
       ("Paralegal", 2, 70000), 
       ("Project Coordinator", 3, 50000), 
       ("Program Lead", 3, 120000),
       ("Chief Administrative Officer", 3, 160000),
       ("Chief Financial Officer", 4, 160000), 
       ("Analyst", 4, 100000), 
       ("Designer", 5, 65000), 
       ("Chief Marketing Officer", 5, 160000); 

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES  ("Jessica","Gisondo", 3, null),
        ("Alanna","Gisondo", 1, 1), 
        ("Lian","Han", 2, 1), 
        ("Kristy","Wu", 4, null), 
        ("Sean","Macwilliams", 5, 4), 
        ("Sara","Kaminksy", 8, null), 
        ("Smita","Satiani", 7, 6), 
        ("Aneesh","Chaganty", 6, 7), 
        ("Dellea","Chew", 9, null), 
        ("Aneesh","Chaganty", 10, 9), 
        ("Angela","Johnson", 12, null), 
        ("Melissa","Kuch", 11, 11); 
        


--- View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'] ----

--- view all departments 
SELECT * FROM departments;

--- view all roles 
SELECT * FROM roles;

--- view all employees
SELECT * FROM employees;

--- add a department ---
INSERT INTO departments (name)

--- add a role
INSERT INTO roles

--- add an employee

-- update an employee role




