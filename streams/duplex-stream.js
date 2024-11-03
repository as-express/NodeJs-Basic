const {Transform, pipeline} = require("stream")
const fs = require("fs")

const read = fs.createReadStream('./data.txt', {highWaterMark: 40})
const write = fs.createWriteStream('./new.txt')

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase())
    }
})

// read.pipe(uppercase).pipe(write)

pipeline(read, uppercase, write, (error) => {
    if(error) {
        console.log(error)
    }
})