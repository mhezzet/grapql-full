import { mergeSchemas } from 'apollo-server-express'
import { UserSchema } from './user'
import { Product, ProductSchema } from './product'

export const schema = mergeSchemas({
  schemas: [UserSchema, ProductSchema]
})

export const models = {
  Product
}
