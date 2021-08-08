import express from 'express'
import ProjectController from '../controllers/ProjectController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.use(AuthMiddleware)

router.get('/', ProjectController.ProjectGetController)

router.get('/:project_id', ProjectController.ProjectGetOneController)

router.post('/createProject', ProjectController.createProjectController)

router.post('/completeProject', ProjectController.CompleteProjectController)

export default {
    path: '/project',
    router
}