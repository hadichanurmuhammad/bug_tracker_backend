import { Sequelize } from 'sequelize'
import config from '../config.js'

import UserModel from '../models/UserModel.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING)

async function postgres () {
    try {
        let db = {}

        db.users = await UserModel(Sequelize, sequelize)

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