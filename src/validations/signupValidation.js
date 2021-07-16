import Joi from 'joi'

export default Joi.object({
    fullName: Joi.string()
                .max(64)
                .min(3)
                .required()
                .error(Error("Name is invalid")),
    phone: Joi.string()
                .pattern(/^9989[012345789][0-9]{7}$/)
                .required()
                .error(Error('Phone number is invalid')),
    email: Joi.string()
                .pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
                .required()
                .error(Error('Email is invalid'))
})