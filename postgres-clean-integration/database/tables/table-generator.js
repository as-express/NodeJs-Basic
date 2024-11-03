import { db } from "../index.js"

export async function createTables() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS car (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          mark VARCHAR(255) NOT NULL,
          horses NUMERIC(10, 2)
        );
        `
        await db.query(query)
        console.log('Car table is created')
    } catch(error) {
        console.log({message: 'Server Error 500', error})
    }
}
