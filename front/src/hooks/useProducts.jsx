import { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import apollo from '../apollo'

export default function useProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    apollo.query({ query }).then(({ data }) => setProducts(data.products))
  }, [])

  return products
}

const query = gql`
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
