const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('/db');



//function for inquirer questions
const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            },






        ])
}

//call the function to execute the question prompts
init();