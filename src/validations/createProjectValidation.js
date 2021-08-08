import Joi from 'joi'

export default Joi.object({
    name: Joi.string()
                .max(64)
                .min(3)
                .required()
                .error(Error("Name is invalid")),
    projectLink: Joi.string()
                .pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
                .required()
                .error(Error('Project link is invalid')),
    summary: Joi.string()
                .required()
                .error(Error('Summary is invalid'))
})