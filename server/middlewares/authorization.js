import { AuthenticationError, ValidationError } from 'apollo-server-express'
import JWT from 'jsonwebtoken'
import config from 'config'

export default function(request) {
  return function() {
    const token = request.headers['authorization']
    if (!token) throw new ValidationError('Access denied, no Token provided')
    try {
      const decoded = JWT.verify(token, config.get('JWT_SECRET'))
      return decoded
    } catch {
      throw new AuthenticationError('Access denied, invalid token')
    }
  }
}
