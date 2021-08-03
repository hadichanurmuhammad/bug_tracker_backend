import HomeRoute from './HomeRoute.js'
import UserRoute from './UserRoute.js'
import FileRoute from './FileRoute.js'
import AdminRoute from './AdminRoute.js'

export default (app) => {
    app.use(HomeRoute.path, HomeRoute.router)
    app.use(UserRoute.path, UserRoute.router)
    app.use(FileRoute.path, FileRoute.router)
    app.use(AdminRoute.path, AdminRoute.router)
}