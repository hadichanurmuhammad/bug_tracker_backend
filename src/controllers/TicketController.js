import ticketValidation from '../validations/addTicketValidation.js'

class TicketController {
    static async addTicketController (req, res) {
        try {
            const data = await ticketValidation.validateAsync(req.body)

            const ticket = await req.postgres.ticket_model.create({
                title: data.title,
                problem_content: data.problem_content,
                priority: data.priority,
                type: data.type
            })

            await res.status(201).json({
                ok: true,
                message: 'Successfully created!',
                data: ticket.dataValues
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async TicketGetController (req, res) {
        try {
            const tickets = await postgres.ticket_model.findAll({})

            res.status(200).json({
                ok: true,
                data: tickets
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async TicketGetOneController (req, res) {
        try {
            const ticket = await postgres.ticket_model.findOne({
                where: {
                    ticket_id: req.params.ticket_id
                }
            })

            res.status(200).json({
                ok: true,
                data: ticket
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}

export default TicketController