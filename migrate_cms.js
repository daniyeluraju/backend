const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('Applying Schema Updates...');

        // precise table creation to avoid errors if they exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS pages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(50) UNIQUE NOT NULL,
                title VARCHAR(100)
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS sections (
                id INT AUTO_INCREMENT PRIMARY KEY,
                page_id INT,
                section_key VARCHAR(50) NOT NULL,
                content JSON,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
                UNIQUE(page_id, section_key)
            );
        `);

        // Seed initial pages if not exist
        await connection.query(`INSERT IGNORE INTO pages (slug, title) VALUES ('home', 'Home Page'), ('about', 'About Us');`);

        // Seed initial content for Home Hero
        const [homePage] = await connection.query("SELECT id FROM pages WHERE slug = 'home'");
        if (homePage.length > 0) {
            await connection.query(`
                INSERT IGNORE INTO sections (page_id, section_key, content) 
                VALUES (?, 'hero', ?)
            `, [homePage[0].id, JSON.stringify({ title: "Leave the Numbers to Us", subtitle: "Your trusted partner for hassle-free bookkeeping and accounting" })]);
        }

        console.log('Migration Complete.');
        await connection.end();
    } catch (error) {
        console.error('Migration Failed:', error);
    }
}

migrate();
