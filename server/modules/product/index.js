import { makeExecutableSchema } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
export { default as Product } from './model'

export const ProductSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
