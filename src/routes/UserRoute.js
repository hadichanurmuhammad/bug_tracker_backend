import express from 'express'
import UserController from '../controllers/UserController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import AdminMiddleware from '../middlewares/AdminMiddleware.js'

const router = express.Router()

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.post('/validate-code', UserController.validateCode)

router.get('/', AuthMiddleware, UserController.getData)

router.post('/editPhoto', AuthMiddleware, UserController.editPhoto)

router.post('/promoteUser', [AuthMiddleware, AdminMiddleware], UserController.promoteUser)

router.post('/edit', AuthMiddleware, UserController.editPersonalData)

router.get('userList', AuthMiddleware, UserController.UserGetController)

router.get('getUser', AuthMiddleware, UserController.UserGetOneController)

export default {
    path: '/users',
    router
}