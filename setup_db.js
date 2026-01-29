const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    try {
        console.log('Connecting to MySQL...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            multipleStatements: true
        });

        console.log('Reading SQL files...');
        const schemaSql = fs.readFileSync(path.join(__dirname, 'database_schema.sql'), 'utf8');
        const dataSql = fs.readFileSync(path.join(__dirname, 'import_data.sql'), 'utf8');

        console.log('Executing Schema...');
        await connection.query(schemaSql);

        console.log('Executing Seed Data...');
        // Note: dataSql might fail if data already exists due to constraints, so we wrap it
        try {
            await connection.query(dataSql);
            console.log('Seed Data Imported successfully.');
        } catch (err) {
            console.warn('Seed data import might have failed (duplicates?):', err.message);
        }

        console.log('Database Setup Complete!');
        await connection.end();
    } catch (error) {
        console.error('Database Setup Failed:', error);
        process.exit(1);
    }
}

setupDatabase();
