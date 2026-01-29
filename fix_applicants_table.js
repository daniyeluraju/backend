const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixTable() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log('Adding experience column to applicants table...');

        try {
            await connection.query('ALTER TABLE applicants ADD COLUMN experience VARCHAR(50) AFTER resume_path');
            console.log('Column added successfully.');
        } catch (err) {
            console.log('Error (maybe column exists?):', err.message);
        }

        await connection.end();
    } catch (error) {
        console.error('Migration Failed:', error);
    }
}

fixTable();
