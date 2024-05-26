const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  multipleStatements: true
});

// Connect to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');

  // Create database and tables if they don't exist
  const sql = `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};
               USE ${dbConfig.DB};
               CREATE TABLE IF NOT EXISTS tutorials (
                 id INT AUTO_INCREMENT PRIMARY KEY,
                 title VARCHAR(255) NOT NULL,
                 description TEXT,
                 published BOOLEAN DEFAULT false
               );`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    console.log("Database and tables initialized");
  });

  connection.end();
});


