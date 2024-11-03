const fs = require("fs")

const read = fs.createReadStream('./data.txt', {highWaterMark: 20}) 
// this highWaterMark
// mean what the data will reading by 20 bytes

read.on('data', (chunk) => {
    console.log('New chunk', chunk.toString())
})

// read => methods 
// read.pause() to stop reading for example if you get enough data you can stop read
// read.pipe() you can do something into the reading operation
// read.on() this is for do something in end, start
// read.close() for close the reading 