import { useState, useEffect } from 'react'
import apollo from '../apollo'
import gql from 'graphql-tag'

export default function useProduct(slug) {
  const [product, setProduct] = useState({})

  useEffect(() => {
    apollo
      .query({ query, variables: { id: slug } })
      .then(({ data }) => setProduct({ ...data.product }))
  }, [])

  return product
}

const query = gql`
  query Product($id: ID!) {
    product(id: $id) {
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
