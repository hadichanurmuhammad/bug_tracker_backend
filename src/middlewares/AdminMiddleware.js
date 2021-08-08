export default async (req, res, next) => {
    try {
        const user = await req.postgres.users.findOne({
            where: {
                user_id: req.user
            }
        })

        if (user.dataValues.role != 'admin' && user.dataValues.role != 'superadmin') throw new Error(`You don't have permission`)

        next()
        
    } catch (e) {
        res.status(403).json({
            ok: false,
            message: e + ""
        })
    }
}