import HomeRoute from './HomeRoute.js'
import UserRoute from './UserRoute.js'
import FileRoute from './FileRoute.js'

export default (app) => {
    app.use(HomeRoute.path, HomeRoute.router)
    app.use(UserRoute.path, UserRoute.router)
    app.use(FileRoute.path, FileRoute.router)
}