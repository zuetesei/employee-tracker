const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
// connection to database
const db = require("./config/connection");

// initial prompt 
function appMenu() {
    console.log('\n\n')
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View Department',
                'View Employees by Manager',
                'View Employees by Department',
                'View Departments',
                'View Roles',
                'View Department Budget',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Update Employee Manager',
                'Delete Employee',
                'Delete Department',
                'Delete Role',
                'Exit'
            ]
        }
    ]).then((answers) => {
        switch (answers.appMenu) {
            case "Exit":
                console.log("Goodbye diokang.");
                db.end();
                break;
            // Views 
            case "View Employees":
                viewEmployees();
                break;
            case "View Employees by Manager":
                viewEmployeesByManager();
                break;
            case "View Employees by Department":
                viewEmployeesByDepartment();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Department Budget":
                viewDepartmentBudget();
                break;
            // Add new
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            // Update existing
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            // Delete existing
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Delete Role":
                deleteRole();
                break;
        }
    })
}

// ==============
// view functions
// ==============

const viewEmployees = () => {


}

const viewEmployeesByManager = () => {

}

const viewEmployeesByDepartment = () => {

}

const viewDepartments = () => {

}

const viewRoles = () => {

}

const viewDepartmentBudget = () => {

}


// add functions
// update functions
// remove functions