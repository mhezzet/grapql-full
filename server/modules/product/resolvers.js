import { UserInputError, AuthenticationError } from 'apollo-server-express'
import {
  productCreateValidation,
  productEditValidation,
  productDeleteValidaton,
  productInputValidatin
} from './validators'

/**
|--------------------------------------------------
| Query: get all products
|--------------------------------------------------
*/

async function products(_, args, { models: { Product } }) {
  const products = await Product.find()
  return products
}

/**
|--------------------------------------------------
| Query: get a product
|--------------------------------------------------
*/

async function product(_, args, { models: { Product } }) {
  const { error } = productInputValidatin(args)
  if (error) throw new UserInputError(error.details[0].message)

  const product = await Product.findOne({ _id: args.id })
  if (!product) throw new UserInputError('no such a product with this id')

  return product
}

/**
|--------------------------------------------------
| Mutation:create product
|--------------------------------------------------
*/

async function createProduct(
  _,
  args,
  { models: { Product }, middlewares: { authorization } }
) {
  const { admin } = authorization()
  if (!admin) throw new AuthenticationError('ur not authorized')

  const { error } = productCreateValidation(args)
  if (error) throw new UserInputError(error.details[0].message)

  const product = await Product.create(args.product)
  return product
}

/**
|--------------------------------------------------
| Mutation:edit product
|--------------------------------------------------
*/

async function editProduct(
  _,
  args,
  { models: { Product }, middlewares: { authorization } }
) {
  const { admin } = authorization()
  if (!admin) throw new AuthenticationError('ur not authorized')

  const { error } = productEditValidation(args)
  if (error) throw new UserInputError(error.details[0].message)

  const product = await Product.findOneAndUpdate(
    { _id: args.id },
    args.product,
    {
      runValidators: true,
      context: 'query'
    }
  )

  return product
}

/**
|--------------------------------------------------
| Mutation:delete product
|--------------------------------------------------
*/

async function deletProduct(
  _,
  args,
  { models: { Product }, middlewares: { authorization } }
) {
  const { admin } = authorization()
  if (!admin) throw new AuthenticationError('ur not authorized')

  const { error } = productDeleteValidaton(args)
  if (error) throw new UserInputError(error.details[0].message)

  const product = await Product.findOneAndDelete({ _id: args.id })
  if (!product) throw new UserInputError('no such a product with this id')

  return product
}

export default {
  Query: {
    products,
    product
  },
  Mutation: {
    createProduct,
    editProduct,
    deletProduct
  }
}
