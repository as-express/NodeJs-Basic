import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'as-express',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'express'
})

export const db = {
    query: (text, params) => pool.query(text, params)
};