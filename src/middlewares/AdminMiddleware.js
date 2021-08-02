export default async (req, res, next) => {
    try {
        const user = await req.postgres.users.findOne({
            where: {
                user_id: req.user
            }
        })

        if (user.dataValues.role != 'admin') {
            throw new Error(`You don't have permission`)
        }

        req.isSuperAdmin = user.dataValues.role == "superadmin"

        next()
        
    } catch (e) {
        res.status(403).json({
            ok: false,
            message: e + ""
        })
    }
}