import cors from 'cors'

export default function(app) {
  app.disable('x-powered-by')
  app.use(cors())
}
