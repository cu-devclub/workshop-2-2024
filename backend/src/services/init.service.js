const db = require("../models/db.service")



async function database() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS \`group\` (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);    

        await db.query(`
            CREATE TABLE IF NOT EXISTS \`item\` (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                group_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                quantity INTEGER DEFAULT 0,
                checked INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (group_id) REFERENCES \`group\`(id) ON DELETE CASCADE
            );
        `);

        return("Database initialization complete.")
    } catch (err) {
        throw new Error("Failed to initialize database")
    }
}

module.exports = {
    database
}