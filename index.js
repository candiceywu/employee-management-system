const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

//function for inquirer questions
const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
            },
        ])
        .then((responses) => {
            if (responses.choices === 'View all departments') {
                viewAllDepartments();
            } else if (responses.choices === 'View all roles') {
                viewAllRoles();
            } else if (responses.choices === 'View all employees') {
                viewAllEmployees();
            } else if (responses.choices === 'Add a department') {
                addDepartment();
            } else if (responses.choices === 'Add a role') {
                addRole();
            } else if (responses.choices === 'Add an employee') {
                addEmployee();
            } else if (responses.choices === 'Update an employee') {
                updateEmployee();
            } else if (responses.choices === 'Exit') {
                return;
            }
        });
};


//function to view all departments
const viewAllDepartments = () => {
    db.query('SELECT id AS id, name AS department FROM departments',
    function (err, res) {
        if (err) {
            console.log(err);
        } console.table(res);
    init();
    })
};


//function to view all roles
const viewAllRoles = () => {
    db.query('SELECT roles.id AS id, roles.title as title, departments.name AS department, roles.salary AS salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
        function (err, res) {
            if (err) {
                console.log(err);
            } console.table(res);
        })
};

//function to view all employees
const viewAllEmployees = () => {
    db.query('SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id',
        function (err, res) {
            if (err) {
                console.log(err);
            } console.table(res);
        })
};


//function to add a department
const addDepartment = () => {
    db.query('INSERT INTO department ')
console.log(`Department successfully added to the database.`)
} 

//function to add an employee
const addEmployee = () => {
    db.query('INSERT INTO employees ')
console.log(`Employee successfully added to the database.`)
} 

//function to add a role
const addRole = () => {
    db.query('INSERT INTO roles ')
console.log(`Employee successfully added to the database.`)
} 

//function to update an employee
const updateEmployee = () => {
    db.query('INSERT INTO employees ')
console.log(`Employee successfully updated in the database.`)
} 

//function for next steps
const nextChoice = () => {
    inquirer
    .prompt ([
        {
            type: 'confirm',
            name: 'next',
            message: 'Would you like to do anything else?',
            default: false
        }
    ])
}

//call the function to execute the question prompts
init();

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });