const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

(async () => {
  try {
    const connection = await db.getConnection();
    console.log(
      `MySQL connected: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        age INT DEFAULT NULL,
        role ENUM('admin', 'manager', 'staff', 'user') NOT NULL DEFAULT 'user',
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        project_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        url VARCHAR(500) DEFAULT NULL,
        img VARCHAR(500) DEFAULT NULL,
        date DATE DEFAULT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS clients (
        client_id INT AUTO_INCREMENT PRIMARY KEY,
        client_name VARCHAR(150) NOT NULL,
        address VARCHAR(500) DEFAULT NULL,
        phone_no VARCHAR(30) DEFAULT NULL,
        email VARCHAR(150) DEFAULT NULL,
        img VARCHAR(500) DEFAULT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_client_email (email)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        blog_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        img VARCHAR(500) DEFAULT NULL,
        author VARCHAR(150) DEFAULT NULL,
        date DATE DEFAULT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS company_info (
        com_id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(200) NOT NULL,
        logo VARCHAR(500) DEFAULT NULL,
        email VARCHAR(150) DEFAULT NULL,
        phone VARCHAR(30) DEFAULT NULL,
        address VARCHAR(500) DEFAULT NULL,
        website VARCHAR(255) DEFAULT NULL,
        about TEXT,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        contact_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(30) DEFAULT NULL,
        subject VARCHAR(255) DEFAULT NULL,
        message TEXT NOT NULL,
        is_read TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS billing_invoices (
        invoice_id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_number VARCHAR(50) NOT NULL,
        client_id INT DEFAULT NULL,
        client_name VARCHAR(150) NOT NULL,
        client_email VARCHAR(150) DEFAULT NULL,
        client_phone VARCHAR(30) DEFAULT NULL,
        client_address VARCHAR(500) DEFAULT NULL,
        issue_date DATE DEFAULT NULL,
        due_date DATE DEFAULT NULL,
        items JSON DEFAULT NULL,
        subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
        tax_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
        tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
        discount DECIMAL(12,2) NOT NULL DEFAULT 0,
        total DECIMAL(12,2) NOT NULL DEFAULT 0,
        status ENUM('draft','sent','paid','overdue','cancelled') NOT NULL DEFAULT 'draft',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_invoice_number (invoice_number)
      )
    `);

    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
})();

module.exports = db;
