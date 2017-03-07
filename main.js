'use strict';

// Turn sqlite3 into verbose mode
const sqlite3 = require('sqlite3').verbose();
// Open the db connection. The return is the db object
const db = new sqlite3.Database('example.sqlite', (err) => console.log('Connected'));


// Creates the employees table if it does not exist
// Will not execute if the table exists
// Moved to function to avoid executing each time.
// Maybe a chance to modularize?
const createEmployeesTable = () => {
  db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)");
};


// Populates employees table with employees.json
const populateEmployees = () => {

  // Using the require method to import a json file
  const { list } = require('./employees.json');

  list.forEach(each => {
    // Insert each employee obeject into the table
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


// Boo - not good. Only returns first row from db
db.get(`SELECT * FROM employees`, (err, { id, first, last, department, salary }) => {

  console.log('From dg.get:');
  console.log(`${id} ${first} ${last} ${department} ${salary}`);

});


// db.all returns an array of results from the sql query
// The callback function for db.all will only execute once,
// when the array of results returns
db.all(`SELECT * FROM employees`, (err, allRows) => {

    // Error handling
    if (err) {
      return console.log(err.toString());
    }

  console.log('Callback only fires once with db.all',new Date().getMilliseconds());

  // Challenge 2: Javascript sorting fun - ES6 is awesome!!
  // 1 - sort all records alphabetically by first name
  // 2 - create a new array of all the employees that make more than 50000
  // 3 - using this new array, create an array that says each persons first and last name, as well as their salary

  // ES6 way
  allRows.sort((a, b) => (a.first > b.first) ? 1 : -1)
  .filter(each => each.salary > 50000)
  .map(each => `${each.first} ${each.last}s salary: ${each.salary} ${each.department}`)
  // Destructuring each object as they are being iterated over
  .forEach(each => console.log(`${each}`));

}); // Close db.all method


// The callback for db.each will execute each time for each resulting row
// Because each row obj is being passed to the callback,
// we can destructure the object in the callback
db.each(`SELECT * FROM employees`, (err, { id, first, last, department, salary }) => {
  // Error handling
  if (err) {
    return console.log(err.toString());
  };

  // Console log each record as it comes back as well as the milliseconds elapsed
  console.log(`
    From db.each:
    milliseconds: ${new Date().getMilliseconds()}
    ${id} ${first} ${last}
    from ${department} Department.
    Salary: ${salary}
  `);

}); // End of db.each
