import express from 'express'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.get('/', AuthMiddleware, (req, res) => {
    res.send('hello')
})

export default {
    path: '/',
    router
}