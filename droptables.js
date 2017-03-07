'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite', (err) => console.log('Connected'));

const dropEmployees = () => {
  db.run(`DROP TABLE employees`);
};

dropEmployees();
