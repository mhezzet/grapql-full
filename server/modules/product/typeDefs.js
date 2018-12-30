import { gql } from 'apollo-server-core'

export default gql`
  type Query {
    products: [Product!]!
    product(slug: String!): Product
  }

  type Mutation {
    createProduct(product: productInput!): Product
    editProduct(id: ID!, product: productInput!): Product
    deleteProduct(id: ID!): Product
  }

  input productInput {
    name: String!
    slug: String!
    image: String!
    description: String
    regular_price: Int!
    sale_price: Int
    date_on_sale_from: String
    date_on_sale_to: String
    manage_stock: Boolean
    stock_quantity: Int
    sku: String
  }

  type Product {
    id: ID!
    name: String!
    slug: String!
    image: String!
    description: String
    regular_price: Int!
    sale_price: Int
    date_on_sale_from: String
    date_on_sale_to: String
    manage_stock: Boolean
    stock_quantity: Int
    sku: String
  }
`
