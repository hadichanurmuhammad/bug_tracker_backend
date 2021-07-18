import JWT from '../modules/jwt.js'

export default async (req, res, next) => {
    try {
        const token = req.headers["authorization"]

        if(!token) throw new Error('Token not found')

        const data = JWT.verifyToken(token)

        if(!data) throw new Error('Invalid token')

        const session = await req.postgres.session_model.findOne({
            where: {
                id: data.id
            }
        })

        if(!session) throw new Error('Session was expired')

        if(req.headers['user-agent'] != session.dataValues.user_agent) {
            await req.postgres.session_model.destroy({
                where: {
                    user_id: session.dataValues.user_id
                }
            })
            throw new Error('Invalid user agent')
        }

        next()
        
    } catch (e) {
        res.status(403).json({
            ok: false,
            message: error + ""
        })  

    }
}