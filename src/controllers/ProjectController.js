import createProjectValidation from '../validations/createProjectValidation.js'

class ProjectController {
    static async ProjectGetController (req, res) {
        try {
            const projects = await req.postgres.project_model.findAll({})

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
            console.log(e);
        }
    }
}

export default ProjectController