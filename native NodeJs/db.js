const { Pool } = require('pg');

const pool = new Pool({
    user: 'as-express', 
    host: 'localhost',
    database: 'nodejs',
    password: '1234',
    port: 5432,       
});

module.exports = pool;
