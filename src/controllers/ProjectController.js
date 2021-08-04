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
}

export default ProjectController