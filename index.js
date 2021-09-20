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

//employee array
const employeeArray = [];

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
            } else if (response.choices === 'Update an employee role') {
                updateEmployeeRole();
            } else if (response.choice === 'Exit') {
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
                message: 'What is the name of the department you would like to add?: '
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO departments SET ?`,
                { name: response.addDepartment },
                function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    // console.table(res);
                    console.log(`${response.addDepartment} successfully added to the database.`);
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
                name: 'firstName',
                message: 'Please enter employee first name: '
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter employee last name: '
            },
            {
                type: 'list',
                name: 'role',
                message: 'Please select employee role: ',
                choices: ['']
            },
            {
                type: 'list',
                name: 'researchAndDevelopmentManager',
                message: 'Please select the manager: ',
                choices: ['Senior Vice President'],
                when: (list) => list.role === ['Researcher', 'Associate']
            },
            {
                type: 'list',
                name: 'legalManager',
                message: 'Please select the manager: ',
                choices: ['General Counsel'],
                when: (list) => list.role === ['Paralegal']
            },
            {
                type: 'list',
                name: 'operationsManager',
                message: 'Please select the manager: ',
                choices: ['Program Lead', 'Chief Administrative Officer'],
                when: (list) => list.role === ['Project Coordinator', 'Program Lead']
            },
            {
                type: 'list',
                name: 'financeManager',
                message: 'Please select the manager: ',
                choices: ['Chief Financial Officer'],
                when: (list) => list.role === ['Analyst']
            },
            {
                type: 'list',
                name: 'marketingManager',
                message: 'Please select the manager: ',
                choices: ['Chief Marketing Officer'],
                when: (list) => list.role === ['Designer']
            },
        ])
        .then((response) => {
            let info = response.addEmployee;
            let sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${manager_id}")`;
            db.query(sql, info,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } console.table(res);
                    employeeArray.push(`${response.firstName} ${response.lastName}`);
                    console.log('Employee successfully added to the database.');
                    init();
                })
        })
};




//function to add a role
const addRole = () => {
    db.query(`SELECT * FROM departments`, (err, res) => {
        if (err) throw err;
        let choice = res.map(dept => ({ name: dept.name, value: dept.id }));
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'What is the title of the role you would like to add?: '
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Please enter a salary for this role: ',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does this role belong to?: ',
                    choices: choice
                },
            ])
            .then((response) => {
                db.query(`UPDATE roles SET ?`,
                    { title: response.roleTitle, salary: response.salary, department_id: response.department },
                    function (err, res) {
                        if (err) {
                            console.log(err);
                        } console.table(res);
                        console.log(`${response.roleTitle} successfully added to the database.`);
                        init();
                    })
            });
    });

}


//function to update an employee role
// const updateEmployeeRole = () => {
//     const employees = db.query(`SELECT * FROM employees`);
//     console.log( { employees });
//     inquirer
//     .prompt ([
//         {
//             type: 'list',
//             message: 'Which employee\'s role do you want to update?',
//             name: 'currentEmployee',
//             choices: employees.map (employee => `${employee.first_name} ${employee.last_name}`),
//         },
//         {
//             type: 'list',
//             message: 'Which role do you want to assign to the selected employee?',
//             name: 'updatedRole',
//             choices: ['']
//         }
//     ])
//         .then((response) => {
//             db.query(`UPDATE employees SET ? WHERE ?`,
//             { last_name = response.currentEmployee, role_id = response.updatedRole },
//                 function (err, res) {
//                     if (err) {
//                         console.log(err);
//                     } console.table(res);
//                     console.log('Employee role successfully updated in the database.');
//                     init();
//                 })
//         })
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



