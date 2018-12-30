import gql from 'graphql-tag'

export const CREATE_PRODUCT = gql`
  mutation Product($product: productInput!) {
    createProduct(product: $product) {
      id
    }
  }
`

export const EDIT_PRODUCT = gql`
  mutation Product($product: productInput!, $id: ID!) {
    editProduct(product: $product, id: $id) {
      id
      name
      slug
      image
      description
      regular_price
      sale_price
      sku
      stock_quantity
      manage_stock
      date_on_sale_to
      date_on_sale_from
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation Product($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

export const GET_PRODUCT = gql`
  query Product($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      image
      description
      regular_price
      sale_price
      sku
      stock_quantity
      manage_stock
      date_on_sale_to
      date_on_sale_from
      __typename
    }
  }
`
export const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      slug
      image
      description
      regular_price
      sale_price
      sku
      stock_quantity
      manage_stock
      date_on_sale_to
      date_on_sale_from
    }
  }
`
export const GET_TOKEN = gql`
  {
    adminToken
  }
`
