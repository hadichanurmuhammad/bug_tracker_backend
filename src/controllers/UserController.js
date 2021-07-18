import phoneValidation from '../validations/phoneValidation.js'
import signupValidation from '../validations/signupValidation.js'
import randomNumber from 'random-number'

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
    static async login (req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body)

            const user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })

            if (!user) throw new Error('User not found')

            const gen = randomNumber.generator({
                min: 100000,
                max: 999999,
                integer: true
            })

            let attempt = await req.postgres.attempts.create({
                code: gen(),
                user_id: user.user_id
            })

            await res.status(201).json({
                ok: true,
                message: 'Code sent',
                id: attempt.dataValues.id
            })

        } catch (e) {
            res.status(401).json({
                ok: false,
                message: e + ""
            })
        }
    }
}

export default UserController