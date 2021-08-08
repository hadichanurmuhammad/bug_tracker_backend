import express from 'express'
import TicketController from '../controllers/TicketController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.use(AuthMiddleware)

router.get('/', TicketController.TicketGetController)

router.get('/:ticket_id', TicketController.TicketGetOneController)

router.post('/addTicket', TicketController.addTicketController)

export default {
    path: '/ticket',
    router
}