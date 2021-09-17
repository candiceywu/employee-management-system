const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db');



//function for inquirer questions
const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
            },
        ])
        .then((responses) => {
            if (responses.choices === 'View all departments') {
                view.viewAllEmployees();
            } else if (responses.choices === 'View all roles') {
                view.viewAllRoles();
            } else if (responses.choices === 'View all employees') {
                view.viewAllEmployees();
            } else if (responses.choices === 'Add a department') {
                add.addDepartment();
            } else if (responses.choices === 'Add a role') {
                add.addRole();
            } else if (responses.choices === 'Add an employee') {
                add.addEmployee();
            } else if (responses.choices === 'Update an employee') {
                update.updateEmployee();
            } else if (responses.choices === 'Exit') {
                return;
            }
        });
};

//function to view all employees
const viewAllEmployees = () => {
    db.query
} 

//function to view all roles
const viewAllRoles = () => {
    db.query
} 


//function to view all employees
const viewAllEmployees = () => {
    db.query
} 

//function to add a department
const addDepartment = () => {
    db.query
} 

//function to add an employee
const addEmployee = () => {
    db.query
} 

//function to update an employee
const updateEmployee = () => {
    db.query
} 

//call the function to execute the question prompts
init();