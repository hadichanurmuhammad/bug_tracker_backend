import Joi from 'joi'

export default Joi.object({
    code_attempts: Joi.number()
            .error(Error('Code attempts is invalid'))
            .min(1)
            .max(999999),
    phone_attempts: Joi.number()
            .error(Error("Phone attempts is invalid"))
            .min(1)
            .max(999999),
    ban_time: Joi.number()
            .error(Error("Ban time is invalid"))
            .min(1) 
})