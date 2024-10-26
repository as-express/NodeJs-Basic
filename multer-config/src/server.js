import express from 'express'
import mongoose from 'mongoose'
import 'colors'
import fileRoutes from './Multer/multer.routes.js'
import {fileURLToPath} from 'url'
import path from 'path'


const app = express()
const port = 3000
const mongoUrl = "" 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use(express.json())
app.use('/api', fileRoutes)


const bootstrap = async() => {
    await mongoose.connect(mongoUrl)
    .then(console.log('MongoDb is connected'.bgGreen))

    app.listen(port, () => {
        console.log(`Server is start on port ${port}`.bgBlue)
    })
}

bootstrap()
