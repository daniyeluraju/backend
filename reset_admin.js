const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetAdmin() {
    try {
        console.log('Connecting to DB...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const email = 'admin@bookxpert.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Generated Hash for '${password}': ${hashedPassword}`);

        // Check if user exists
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            console.log('User exists. Updating password...');
            await connection.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
            console.log('Password updated successfully.');
        } else {
            console.log('User does not exist. Creating new admin...');
            await connection.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                ['Admin User', email, hashedPassword, 'admin']);
            console.log('Admin user created successfully.');
        }

        await connection.end();
        console.log('Done.');
    } catch (error) {
        console.error('Error:', error);
    }
}

resetAdmin();
