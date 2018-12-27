import { ApolloServer } from 'apollo-server-express'
import { schema, models } from '../modules'
import middlewares from '../middlewares'

export default function apolloConnect(app) {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      models,
      middlewares: middlewares(req),
      query: { req, res }
    })
  })
  server.applyMiddleware({ app })
}
