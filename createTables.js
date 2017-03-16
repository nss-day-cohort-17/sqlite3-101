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
  return db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)");
};

createEmployeesTable();
