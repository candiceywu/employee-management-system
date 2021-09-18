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
        .then((response) => {
            if (response.choices === 'View all departments') {
                viewAllDepartments();
            } else if (response.choices === 'View all roles') {
                viewAllRoles();
            } else if (response.choices === 'View all employees') {
                viewAllEmployees();
            } else if (response.choices === 'Add a department') {
                addDepartment();
            } else if (response.choices === 'Add a role') {
                addRole();
            } else if (response.choices === 'Add an employee') {
                addEmployee();
            } else if (response.choices === 'Update an employee') {
                updateEmployee();
            } else if (responses.choice === 'Exit') {
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
            init();
        })
};

//function to view all employees
const viewAllEmployees = () => {
    db.query('SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id',
        function (err, res) {
            if (err) {
                console.log(err);
            } console.table(res);
            init();
        })
};


//function to add a department
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'Enter a department name'
            }
        ])
        .then((response) => {
            let info = response.addDepartment;
            let sql = 'INSERT INTO departments (name) VALUES ?';
            db.query(sql, info,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } console.table(res);
                    console.log('Department successfully added to the database.');
                    init();
                })
        })
};

//function to add an employee
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Please enter employee first and last name'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Please select employee role',
                choices: ['Researcher', 'Associate', 'Paralegal', 'Project Coordinator', 'Program Lead', 'Analyst', 'Designer']
            }
        ])
        .then((response) => {
            let info = response.name;
            let fullname = info.split(" ");
            console.log(fullname);
            let sql = 'INSERT INTO employees (first_name, last_name) VALUES ?';
            db.query(sql, fullname,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } console.table(res);
                    console.log('Employee successfully added to the database.');
                    init();
                })
        })
};

//function to add a role
const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter a role title'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Please enter a salary for this role'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Please select a department',
                choices: ['Research and Development', 'Legal', 'Operations', 'Finance', 'Marketing']
            },
        ])
        .then((response) => {
            let info = response.addRole;
            let sql = 'INSERT INTO roles (title) VALUES ?';
            db.query(sql, info,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } console.table(res);
                    console.log('Role successfully added to the database.');
                    init();
                })
        })
};

//function to update an employee
// const updateEmployee = () => {
//     db.query('UPDATE INTO employees ')
//     console.log(`Employee successfully updated in the database.`)
// }


//call the function to execute the question prompts
init();

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});