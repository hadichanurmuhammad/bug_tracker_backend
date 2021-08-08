import Joi from 'joi'

export default Joi.object({
    ticket_id: Joi.string()
                    .required()
                    .error(Error('Ticket id is invalid'))
})