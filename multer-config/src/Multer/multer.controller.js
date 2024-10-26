import Storage from "../Models/Storage.js"



export const uploadFile = async(req,res) => {
    const image = req.file ? req.file.path : ''

    try {
        const file = new Storage({file: image, count: +1})

        await file.save()
        res.status(200).json({message: 'File is upload', file})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in server'})
    }
}

export const getFiles = async(req, res) => {
    const files = await Storage.find()
    res.status(200).json({files})
}

export const deleteFile = async(req, res) => {
    const {id} = req.params

    try {
        const file = await Storage.findById(id)
        if(!file) {
            res.status(404).json({message: 'File is not defind'})
        }
        
        await Storage.findByIdAndDelete(id)
        res.status(200).json({message: 'File is Deleted'})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in server'})
    }
}
