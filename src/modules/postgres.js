import { Sequelize } from 'sequelize'
import config from '../config.js'

import UserModel from '../models/UserModel.js'
import AttemptsModel from '../models/AttemptsModel.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING)

async function postgres () {
    try {
        let db = {}

        db.users = await UserModel(Sequelize, sequelize)
        db.attempts = await AttemptsModel(Sequelize, sequelize)

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

        await sequelize.sync()

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