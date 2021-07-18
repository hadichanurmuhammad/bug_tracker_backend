import express from 'express'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import fileupload from 'express-fileupload'
import FileController from '../controllers/FileController.js'
import path from 'path'
let __dirname = path.resolve(path.dirname(''));


const router = express.Router()

router.use(AuthMiddleware)

const options = {
    safeFileNames: true
}

router.post('/create', fileupload("file", options), FileController.createFile )

router.use('/getFile', express.static(path.join(__dirname, "src", "public", "files")))

export default {
    path: "/file",
    router: router
}