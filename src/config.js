import dotenv from 'dotenv'

const { env } = process

dotenv.config()

export default {
    PORT: env.PORT,
    PG_CONNECTION_STRING: env.PG_CONNECTION_STRING,
    JWT_SECRET: env.JWT_SECRET,
    EMAIL: env.EMAIL,
    PASSWORD: env.PASSWORD
}