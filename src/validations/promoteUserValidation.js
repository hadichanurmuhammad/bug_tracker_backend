import Joi from 'joi'

export default Joi.object({
    user_id: Joi.string()
            .required()
            .error(Error('User id is invalid')),
    role: Joi.string()
            .required()
            .error(Error('Role is invalid'))
})