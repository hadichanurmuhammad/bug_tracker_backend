import phoneValidation from '../validations/phoneValidation.js'
import signupValidation from '../validations/signupValidation.js'

class UserController {
    static async checkPhone (req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body)

            let user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })

            res.status(200).json({
                ok: true,
                exists: user ? true : false
            })

        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
    static async signup (req, res) {
        try {
            const data = await signupValidation.validateAsync(req.body)

            const user = await req.postgres.users.create({
                fullName: data.fullName,
                phone: data.phone,
                email: data.email
            })

            await res.status(201).json({
                ok: true,
                message: 'Successfully registrated',
                data: user.dataValues
            })

        } catch (e) {
            if (e == "SequelizeUniqueConstraintError: Validation error"){
                e = 'Phone already exists'
            }
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}

export default UserController