import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config.js'

async function main () {
    const PORT = config.PORT
    const app = express()
    const server = http.createServer(app)
    server.listen(PORT, () => console.log(`HTTP server ready`))

    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

main()