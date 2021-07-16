import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello')
})

export default {
    path: '/',
    router
}