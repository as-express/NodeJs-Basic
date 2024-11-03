import express from 'express'
import 'colors'
import { createTables } from './database/tables/table-generator.js'
import { db } from './database/index.js'

const app = express()
createTables()

app.use(express.json())


app.post('/', async(req, res) => {
    try {
        const {title, mark, horses} = req.body
        if(!title || !mark || !horses) {
            res.send({status: 400, message: 'Please write the title, mark , horses'})
        }
        const resp = await db.query('INSERT INTO car (title, mark, horses) VALUES ($1, $2, $3) RETURNING *',
            [title, mark, horses]
        )
        res.send(resp.rows[0])
    }
    catch(error) {
    console.log(error)
}
})

app.delete('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(!id) {
            res.send({status: 400, message: 'Please put id into params'})
        }
        const resp = await db.query('DELETE FROM car WHERE id = $1 RETURNING  *',
            [id] 
        )
        res.send(resp[0])
    }
    catch(error) {
    console.log(error)
 }
})

app.put('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id)
    const {horses} = req.body
    if(!id) {
        res.send({status: 400, message: 'Please put id' })
    }
    if(horses === undefined) {
        res.send({status: 400, message: 'Please put horses'})
    }

    const resp = await db.query(
        'UPDATE car SET horses = $1 WHERE id = $2 RETURNING *',
        [horses, id]
    )

    res.send(resp[0])
    }
    catch(error) {
    console.log(error)
 }
})

app.get('/', async(req, res) => {
    try {
        const resp = await db.query('SELECT * FROM car')
        res.send(resp.rows)
    } catch(error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log('Server run on port 3000'.bgGreen)
})