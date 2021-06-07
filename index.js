require('dotenv').config();
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'bigsandDB',
});


const addEmployee = () => {
    inquirer
        .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is their role id?',
            validate(value) {
            if (!isNaN(value)) {
                return true;
            }
            return false;
            },
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'What is their manager id?',
            validate(value) {
            if (!isNaN(value)) {
                return true;
            }
            return false;
            },
        }
        ])
        .then((answer) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
            },
            (err) => {
            if (err) throw err;
            console.log('Your employee was added successfully!');

            start();
            }
        );
        });
}

const viewEmployee = () => {
    var thing;
    console.log('retrieving employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        thing = res;
        connection.end();
    });
    start();
};

const viewDepartment = () => {
    var thing;
    console.log('retrieving departments...\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        thing = res;
        connection.end();
    });
    start();
};

const viewRoles = () => {
    var thing;
    console.log('retrieving roles...\n');
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        thing = res;
        connection.end();
    });
    start();
};

const start = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'first',
                message: 'choose the thing.',
                choices: [
                    'Add Employee',
                    'Add Department',
                    'Add Role',
                    'View Employees',
                    'View Departments',
                    'View Roles',
                    "Update an Employee's roles"
                ]
            }
        ])
        .then((answer) => {
            switch(answer.first) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View Employees":
                    viewEmployee();
                    break;
                case "View Departments":
                    viewDepartment();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "Update an Employee's roles":
                    updateRole();
                    break;
                default:
                    console.log("how did you even do this");
            }
        });
};

start();