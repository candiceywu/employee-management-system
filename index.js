const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
let someVar = ""

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
                    viewAllDepartments();
                    init();
                })
        })
};

//function to add an employee
const addEmployee = () => {
    db.query(`SELECT * FROM roles`, (err, res) => {
        if (err) throw err;
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
                    choices() {
                        //inquirer can take in a function for its choices; need to take the array and loop through for the title that's been deconstructed and push it to the array
                        const roleArray = [];
                        res.forEach(({ title }) => {
                            roleArray.push(title)
                        });
                        return roleArray;
                    }
                },
            ])
            .then((response) => {
                //here, we look for where the role id matches the title
                db.query(`SELECT id FROM roles WHERE title=?`, response.role, (err, result) => {
                    if (err) { throw err; } else {
                        //the results returned will be an array with one object in it, which we need to stringify because query needs it to be in string format
                        const userAnswer = JSON.stringify(result[0].id)
                        db.query(`SELECT * FROM employees`, (err, res) => {
                            if (err) throw err;
                            inquirer
                                .prompt([
                                    {
                                        type: 'list',
                                        name: 'manager',
                                        message: 'Please select the manager',
                                        choices() {
                                            const managerArray = ['No manager'];
                                            res.forEach(({ first_name, last_name }) => {
                                                managerArray.push(`${first_name} ${last_name}`)
                                            });
                                            return managerArray;
                                        }
                                    }
                                ])
                                .then((answer) => {
                                    db.query(`SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name)=?`, answer.manager, (err, result) => {
                                        if (err) { throw err; } else {
                                            if (answer.manager !== 'No manager') {
                                                someVar = JSON.stringify(result[0].id)
                                            } else {
                                                console.log('manager')
                                                someVar = null;
                                            }
                                            db.query(`INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`, [response.firstName, response.lastName, userAnswer, someVar], (err, res) => {
                                                if (err) {
                                                    console.log(err);
                                                } console.table(res);
                                                console.log('Employee successfully added to the database.');
                                                viewAllEmployees();
                                                init();
                                            })
                                        }
                                    });
                                })
                        })
                    }
                });
            })
    })
}


//function to add a role
const addRole = () => {
    //res is an array since select all will give an array
    db.query(`SELECT * FROM departments`, (err, res) => {
        if (err) throw err;
        // let choice = res.map(({ id, name }) => ({
        //     name: name,
        //     id: id
        // }))
        // let choice = res.map(dept => ({ name: dept.name, value: dept.id }));
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
                    choices() {
                        //inquirer can take in a function for its choices; need to take the array and loop through for the title that's been deconstructed and push it to the array
                        const departmentArray = [];
                        res.forEach(({ name }) => {
                            departmentArray.push(name)
                        });
                        return departmentArray;
                    }
                },
            ])
            .then((response) => {
                db.query(`INSERT INTO roles SET ?`,
                    { title: response.roleTitle, salary: response.salary, department_id: response.department },
                    function (err, res) {
                        if (err) {
                            console.log(err);
                        } console.table(res);
                        console.log(`${response.roleTitle} successfully added to the database.`);
                        viewAllRoles;
                        init();
                    })
            });
    });
}


//function to update an employee role
const updateEmployeeRole = () => {
    const employees = db.query(`SELECT * FROM employees`, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Which employee\'s role do you want to update?',
                    name: 'currentEmployee',
                    choices()
                },
                {
                    type: 'list',
                    message: 'Which role do you want to assign to the selected employee?',
                    name: 'updatedRole',
                    choices() {
                        //inquirer can take in a function for its choices; need to take the array and loop through for the title that's been deconstructed and push it to the array
                        const roleArray = [];
                        res.forEach(({ title }) => {
                            roleArray.push(title)
                        });
                        return roleArray;
                    }
                },
            ])
            .then((response) => {
                db.query(`UPDATE employees SET ? WHERE ?`, [response.currentEmployee, response.UpdatedRole], (err, res) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table(res);
                        console.log('Employee role successsfully updated in the database.');
                        viewAllEmployees();
                        init();
                    }
                })
            })
    })
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



