import express from 'express'
import UserController from '../controllers/UserController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.post('/check-phone', UserController.checkPhone)

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.post('/validate-code', UserController.validateCode)

router.get('/', AuthMiddleware, UserController.getData)

router.post('/editPhoto', AuthMiddleware, UserController.editPhoto)

export default {
    path: '/users',
    router
}