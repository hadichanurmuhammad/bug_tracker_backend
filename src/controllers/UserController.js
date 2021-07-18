import phoneValidation from '../validations/phoneValidation.js'
import signupValidation from '../validations/signupValidation.js'
import randomNumber from 'random-number'
import sendSms from '../modules/sms.js'
import codeValidation from '../validations/codeValidation.js'
import pkg from 'sequelize'
import moment from 'moment'
const { Op } = pkg

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

            const ban = await req.postgres.ban_model.findOne({
                where: {
                    user_id: user.dataValues.user_id,
                    expireDate: {
                        [Op.gt]: new Date()
                    }
                }
            })

            console.log(ban);

            if(ban) throw new Error(`You are banned until ${moment(ban.dataValues.expireDate)}`)

            const gen = randomNumber.generator({
                min: 100000,
                max: 999999,
                integer: true
            })

            await req.postgres.attempts.destroy({
                where: {
                    user_id: user.user_id
                }
            })

            let attempt = await req.postgres.attempts.create({
                code: gen(),
                user_id: user.user_id
            })

            await sendSms(data.phone, `Your code: ${attempt.dataValues.code}`)

            console.log(attempt.dataValues.code);

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
    static async validateCode (req, res) {
        try {
            const validationId = req.headers["code-validation-id"]
            if(!validationId) throw new Error('Invalid validation token')
            const attempt = await req.postgres.attempts.findOne({
                where: {
                    id: validationId
                },
                include: {
                    model: req.postgres.users,
                    attributes: ["user_attempts"]
                }
            })

            if(!attempt) throw new Error('Validation code is not found')

            console.log(attempt.dataValues.attempts, attempt.dataValues.user.dataValues.user_attempts)

            const { code } = await codeValidation.validateAsync(req.body)

            if(Number(code) !== Number(attempt.dataValues.code)) {
                await req.postgres.attempts.update({
                    attempts: attempt.dataValues.attempts + 1
                }, {
                    where: {
                        id: validationId
                    }
                })
                if(Number(attempt.dataValues.attempts) > 3){
                    await req.postgres.attempts.destroy({
                        where: {
                            id: validationId
                        }
                    })

                    await req.postgres.users.update({
                        user_attempts: attempt.dataValues.user.dataValues.user_attempts + 1
                    }, {
                        where: {
                            user_id: attempt.dataValues.user_id
                        }
                    })

                    if(Number(attempt.dataValues.user.dataValues.user_attempts) >= 3){
                        await req.postgres.users.update({
                            user_attempts: 0
                        }, {
                            where: {
                                user_id: attempt.dataValues.user_id
                            }
                        })

                        await req.postgres.ban_model.create({
                            user_id: attempt.dataValues.user_id,
                            expireDate: new Date(Date.now() + 7200000)
                        })
                    }

                }
                throw new Error("Validation code is incorrect")
            }
        } catch (e) {
            res.status(401).json({
                ok: false,
                message: e + ""
            })
        }
    }
}

export default UserController