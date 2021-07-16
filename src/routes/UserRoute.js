import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/check-phone', UserController.checkPhone)

router.post('/signup', UserController.signup)

export default {
    path: '/users',
    router
}