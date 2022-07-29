const dotenv = require("dotenv");
const mysql = require('mysql');

require('dotenv').config();
dotenv.config({path: './.env'});

const host = process.env.HOST;
const name = process.env.USER;
const password = process.env.PASSWORD;

const db = mysql.createConnection({
    host     : host,
    user     : name,
    password : password,
    database : 'testjle'
});

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });

  module.exports = db;