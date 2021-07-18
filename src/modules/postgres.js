import { Sequelize } from 'sequelize'
import config from '../config.js'

import UserModel from '../models/UserModel.js'
import AttemptsModel from '../models/AttemptsModel.js'
import BanModel from '../models/BanModel.js'
import SessionModel from '../models/SessionModel.js'
import SettingsModel from '../models/SettingsModel.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false
})

async function postgres () {
    try {
        let db = {}

        db.users = await UserModel(Sequelize, sequelize)
        db.attempts = await AttemptsModel(Sequelize, sequelize)
        db.ban_model = await BanModel(Sequelize, sequelize)
        db.session_model = await SessionModel(Sequelize, sequelize)
        db.settings_model = await SettingsModel(Sequelize, sequelize)

        await db.users.hasMany(db.attempts, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.attempts.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.users.hasMany(db.ban_model, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.ban_model.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.users.hasMany(db.session_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.session_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await sequelize.sync({force: false})

        // await db.ban_model.destroy({
        //     where: {
        //         user_id: id
        //     }
        // })

        // let x = await db.settings_model.create(
        //     {
        //         name: "code_attempts",
        //         value: "3"
        //     }
        // )

        // let x = await db.settings_model.create(
        //     {
        //         name: "ban_time",
        //         value: "7200000"
        //     }
        // )

        // const settings = await db.settings_model.findAll()


        // console.log(banTimeSize.dataValues.value)

        // try {
        //     await sequelize.authenticate();
        //     console.log('Connection has been established successfully.');
        //   } catch (error) {
        //     console.error('Unable to connect to the database:', error);
        //   }

        return db
    } catch (e) {
        console.log('DB_ERROR:', e);
    }
}

export default postgres