import { Sequelize } from 'sequelize'
import config from '../config.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING)

async function postgres () {
    try {
        let db = {}

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