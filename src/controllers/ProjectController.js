import createProjectValidation from '../validations/createProjectValidation.js'
import completeProjectValidation from '../validations/completeProjectValidation.js'

class ProjectController {
    static async ProjectGetController (req, res) {
        try {
            const projects = await req.postgres.project_model.findAll({
                include: {
                    model: req.postgres.users
                }
            })
            console.log(req);

            res.status(200).json({
                ok: true,
                data: projects
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async ProjectGetOneController (req, res) {
        try {
            const project = await req.postgres.project_model.findOne({
                where: {
                    project_id: req.params.project_id
                }
            })

            res.status(200).json({
                ok: true,
                data: project
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async createProjectController (req, res) {
        try {
            const data = await createProjectValidation.validateAsync(req.body)

            const project = await req.postgres.project_model.create({
                name: data.name,
                projectLink: data.projectLink,
                summary: data.summary
            })

            await res.status(201).json({
                ok: true,
                message: 'Successfully created!',
                data: project.dataValues
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async CompleteProjectController (req, res) {
        try {
            const data = completeProjectValidation.validateAsync(req.body)

            const project = req.postgres.project_model.update({
                completed: true
            }, {
                where: {
                    project_id: data.project_id
                }
            })

            res.status(202).json({
                ok: true,
                message: 'Edited',
                data: project
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}

export default ProjectController