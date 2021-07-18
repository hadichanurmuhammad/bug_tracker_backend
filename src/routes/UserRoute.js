import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/check-phone', UserController.checkPhone)

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.post('/validate-code', UserController.validateCode)

export default {
    path: '/users',
    router
}