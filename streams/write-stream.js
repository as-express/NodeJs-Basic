const fs = require("fs")

const write = fs.createWriteStream('./new.txt') // to create the directory for write data
write.write('This is Write Stream') // you can write the file for example 
write.end('This is end') // text in the last

// write.destroy()  for delete the data