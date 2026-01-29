const mysql = require('mysql2/promise');
require('dotenv').config();

async function debugDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log('Checking Pages table...');
        const [pages] = await connection.query('SELECT * FROM pages');
        console.log('Pages:', pages);

        console.log('Checking Sections table...');
        const [sections] = await connection.query('SELECT * FROM sections');
        console.log('Sections:', sections);

        await connection.end();
    } catch (error) {
        console.error('DB Check Failed:', error);
    }
}

debugDB();
