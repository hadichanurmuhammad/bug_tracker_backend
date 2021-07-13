import dotenv from 'dotenv'

const { env } = process

dotenv.config()

export default {
    PORT: env.PORT
}