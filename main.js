'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite');

const dropEmployees = () => {
  db.run(`DROP TABLE employees`);
};
// dropEmployees();

// Creates the employees table if it does not exist
// Will not execute if the table exists
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)");


const populateEmployees = () => {

  const { list } = require('./employees.json');

  list.forEach(each => {
    db.run(`INSERT INTO employees VALUES (
      ${each.id},
      "${each.firstName}",
      "${each.lastName}",
      ${each.salary},
      "${each.dept}"
    )`);
  })

};
// populateEmployees();
