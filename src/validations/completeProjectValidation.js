import Joi from 'joi'

export default Joi.object({
    project_id: Joi.string()
                    .required()
                    .error(Error('Project id is invalid'))
})