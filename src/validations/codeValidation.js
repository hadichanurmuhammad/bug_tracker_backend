import Joi from 'joi'

export default Joi.object({
    code: Joi.number()
            .required()
            .min(100000)
            .max(999999)
            .error(Error('Code is invalid'))
})