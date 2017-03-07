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


// Populates employees table with employees.json
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

// Boo - not good
// db.get(`SELECT * FROM employees`, (err, row) => {
//   console.log(row);
// });


// db.all returns an array of results from the sql query
db.all(`SELECT * FROM employees`, (err, allRows) => {
  // Destructuring each object as they are being iterated over
  // console.log(new Date().getMilliseconds())
  // allRows.forEach(( { id, first, last, department, salary } ) => {
  //   console.log(`
  //     ${id} ${first} ${last}
  //     from ${department} Department.
  //     Salary: ${salary}
  //   `);
  // });

  // Challenge 2: Javascript sorting fun - ES6 is awesome!!
  // 1 - sort all records alphabetically by first name
  // 2 - create a new array of all the employees that make more than 50000
  // 3 - using this new array, create an array that says each persons first and last name, as well as their salary
});


// db.each(`SELECT * FROM employees`, (err, { id, first, last, department, salary }) => {
//   console.log(`
//     ${new Date().getMilliseconds()}
//     ${id} ${first} ${last}
//     from ${department} Department.
//     Salary: ${salary}
//   `);
// });


// Error handling
// Modularize create table and drop table functions
// Complet exercise 13
