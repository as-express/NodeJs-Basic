import express from 'express'
import { multerConfig } from '../config/multer.config.js'
import { deleteFile, getFiles, uploadFile } from './multer.controller.js'


const router = express.Router()

router.route('/upload').post(multerConfig.single('file'), uploadFile)
router.route('/').get(getFiles)
router.route('/:id').delete(deleteFile)


export default router
