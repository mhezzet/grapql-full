import JWT from 'jsonwebtoken'
import config from 'config'

function adminToken() {
  return JWT.sign({ admin: true }, config.get('JWT_SECRET'))
}

function whoAmI(parent, args, { middlewares: { authorization } }) {
  const { admin } = authorization()

  if (!admin) return 'ur not admin'

  return 'ur admin'
}

export default {
  Query: {
    adminToken,
    whoAmI
  }
}
