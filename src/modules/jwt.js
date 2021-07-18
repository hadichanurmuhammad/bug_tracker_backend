import JWT from 'jsonwebtoken'
import config from '../config.js'

function generateToken(data) {
    return JWT.sign(data, config.JWT_SECRET)
}

function verifyToken(token) {
    try {
       return JWT.verify(token, config.JWT_SECRET) 
    } catch (error) {
        return false
    }
}

export default {
    generateToken,
    verifyToken
}