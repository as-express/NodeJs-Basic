const http = require('node:http')
const EventEmitter = require('events');
import pool from './db';

const eventEmitter = new EventEmitter()

const hostname = '127.0.0.1'
const PORT = 3000

const server = http.createServer(async (req, res) => {
    res.headersSent('Content-Type', 'application/json')

    if(req.method === 'GET' && req.url === '/cars') {
        try {
            const cars = await pool.query('SELECT * FROM car')
            res.statusCode = 200;
            res.end(JSON.stringify({cars: cars.rows, count: cars.rowCount}))
        } catch(error) {
            console.error(error)
            res.statusCode = 500
            res.end(JSON.stringify({message: 'Server Error'}))
        }
    }
    else if(req.method === 'POST' && req.url === '/cars') {
        try {
            let body = '';

            req.on('data', async() => {
                const {mark, model} = JSON.parse(body)
                try {
                    const car = await pool.query('INSERT INTO car (mark, model) VALUES ($1, $2) RETURNING *', [mark, model])
                    res.statusCode = 201
                    res.end(JSON.stringify({object: car.rows[0], message: 'Car is created'}))
                } catch(error) {
                    console.error(error)
                    res.statusCode = 500
                    res.end(JSON.stringify({message: 'Server Error'}))
                }
            })
        } catch(error) {
            console.error(error)
            res.statusCode = 500
            res.end(JSON.stringify({message: 'Server Error'}))
        }
    }
    else if(req.method === 'GET' && req.url.startsWith === '/cars/') {
        const id = req.url.split('/')[2]
        try {
            const car = await pool.query('SELECT * FROM car WHERE id = $1', [id])
            if(car.rows.length > 0) {
                res.statusCode = 200;
                res.end(JSON.stringify(car.rows[0]))
            }
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'Car Not Found' }));
            }

        } catch(error) {
            console.error(error)
            res.statusCode = 500
            res.end(JSON.stringify({message: 'Server Error'}))
        }
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const id = req.url.split('/')[2];
        try {
            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length > 0) {
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'User Deleted', user: result.rows[0] }));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
        } catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
})


server.listen(PORT, hostname, () => {{
    console.log(`Server running at http://${hostname}:${PORT}`)
}})
