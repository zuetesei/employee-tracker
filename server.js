const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
// connection to database
const db = require('./config/connection');

db.connect(err => {
    if (err) throw err;
    appMenu();
})

// initial prompt 
function appMenu() {
    console.log('\n\n')
    inquirer.prompt([{

        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'View All Employees by Departments',
            'View Department Budgets',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Remove Employee',
            'Remove Department',
            'Remove Role',
            'Exit'
        ]
    }]).then((answers) => {
        // console.log(answers);

        //=========== View all Departments =========== // 
        if (answers.menu === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw (err)
                console.log('Viewing All Departments: ');
                console.table(result);
                appMenu();
            });

            //=========== View all Roles =========== //
        } else if (answers.menu === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw (err)
                console.log('Viewing All Roles: ');
                console.table(result);
                appMenu();
            });

            //=========== View all Employees =========== //
        } else if (answers.menu === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw (err)
                console.log('Viewing All Employees: ');
                console.table(result);
                appMenu();
            });

            //=========== View all Employees by Departments =========== //
        } else if (answers.menu === 'View All Employees by Departments') {
            db.query(`SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;`,
                function (err, result) {
                    if (err) throw err
                    console.table(result)
                    appMenu()
                });

            //=========== View Department Budgets =========== //
        } else if (answers.menu === 'View Budget') {
            console.log('Showing budget by department...\n');

            db.query(`SELECT department_id AS id, 
                      department.name AS department,
                      SUM(salary) AS budget FROM role  
                        JOIN department ON role.department_id = department.id GROUP BY  department_id`, (err, result) => {
                if (err) throw err;
                console.table(result);

                appMenu();
            });

            //=========== Add a Department =========== //
        } else if (answers.menu === 'Add a Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please add a department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    appMenu();
                });
            })

            //=========== Add Role =========== //
        } else if (answers.menu === 'Add a Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        appMenu();
                    });
                })
            });

            //=========== Add Employee =========== //
        } else if (answers.menu === 'Add an Employee') {
            addEmployee();

            //=========== Update Employee Role =========== //
        } else if (answers.menu === 'Update an Employee Role') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Choose an Employee to Update
                        type: 'list',
                        name: 'employee',
                        message: 'Which employees role do you want to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        // Updating role
                        type: 'list',
                        name: 'role',
                        message: 'What is their new role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var name = result[i];
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`UPDATE employee SET ? WHERE ?`, [{ role_id: role }, { last_name: name }], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        appMenu();
                    });
                })
            });

            //=========== Remove an Employee =========== //
        } else if (answers.menu === 'Remove Employee') {
            db.query(`Select * FROM employee`, (err, data) => {
                if (err) throw err;

                const employees = data.map(({ id, first_name, last_name }) => ({
                    name: first_name + " " + last_name, value: id
                }))

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'name',
                        message: "Which employee would you like to delete?",
                        choices: employees
                    }
                ]).then(employeeInput => {
                    const employee = employeeInput.name;

                    db.query(`DELETE FROM employee WHERE id=?`, employee, (err, result) => {
                        if (err) throw err;
                        console.log('Employee removed from database.');
                        appMenu();
                    });
                });
            });

        } else if (answers.menu === 'Remove Role') {
            db.query(`SELECT * FROM role`, (err, data) => {
                if (err) throw err;

                const role = data.map(({ title, id }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What role do you want to delete?",
                        choices: role
                    }
                ]).then(roleInput => {
                    db.query(`DELETE FROM role WHERE id=?`, roleInput.role, (err, result) => {
                        if (err) throw err;
                        console.log('Role succesfully deleted.');
                        appMenu();
                    })
                })
            })

            //=========== Exit =========== //
        } else if (answers.menu === 'Exit') {
            db.end();
            console.log('See you next time!');
        }
    });
}


function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name: ",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Please enter employee's first name.");
                    return false;
                }
            }
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name: ",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter employee's last name.");
                    return false;
                }
            }
        },
    ]).then(answer => {
        const params = [answer.firstname, answer.lastname]
        console.log(params)
        db.query(`SELECT role.id, role.title FROM role`, (err, data) => {
            if (err) throw err;

            const roles = data.map(({ id, title }) => ({ name: title, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ]).then(roleInput => {
                const role = roleInput.role;
                params.push(role);
                db.query(`SELECT * FROM employee`, (err, data) => {
                    if (err) throw err;

                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                    ]).then(managerInput => {
                        const manager = managerInput.manager;
                        params.push(manager);

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`, params, (err, result) => {
                            if (err) throw err;
                            console.log('Employee has been added!')
                            appMenu();
                        })
                    })
                })
            })
        })
    })
}