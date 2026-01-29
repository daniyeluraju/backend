const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkPages() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const [pages] = await connection.query('SELECT * FROM pages');
        console.log('Pages in DB:', pages);

        const [jobs] = await connection.query('SELECT * FROM jobs');
        console.log('Jobs in DB:', jobs);

        await connection.end();
    } catch (error) {
        console.error('DB Check Failed:', error);
    }
}

checkPages();
