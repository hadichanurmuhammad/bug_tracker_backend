import Joi from 'joi'

export default Joi.object({
    title: Joi.string()
                .required()
                .error(Error('Title is invalid')),
    problem_content: Joi.string()
                .required()
                .error(Error('Problem content is invalid')),
    priority: Joi.array()
                .items(Joi.string())
                .required()
                .error(Error('Priority in invalid')),
    type: Joi.array()
                .items(Joi.string())
                .required()
                .error(Error('Type in invalid')),
})