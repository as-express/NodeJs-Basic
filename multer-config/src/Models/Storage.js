import mongoose from "mongoose"


const Storage = new mongoose.Schema({
    count: {type: Number, default: 0},
    file: {type: String, required: true}
})


export default mongoose.model('Storage', Storage)