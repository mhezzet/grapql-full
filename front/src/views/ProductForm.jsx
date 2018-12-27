import React, { useState, useEffect } from 'react'
import { Container, Form, Message, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import apollo, { error as Error } from '../apollo'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const style = {
  minHeight: '85vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}

export default function ProductForm({ match, location, history }) {
  const [product, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const changeHandler = (name, value) => {
    setForm({ ...product, [name]: value })
  }

  const clickHandler = () => {
    setLoading(true)
    if (match.params.type === 'create') {
      apollo
        .mutate({ mutation: createProduct, variables: { product } })
        .then(({ data }) => {
          setLoading(false)
          setError(null)
          history.push(`/products/${data.createProduct.id}`)
        })
        .catch(error => {
          console.log(error)
        })
    } else if (match.params.type === 'edit') {
      apollo
        .mutate({
          mutation: editProduct,
          variables: { product, id: match.params.slug }
        })
        .then(({ data }) => {
          setLoading(false)
          setError(null)
          history.push(`/dashboard/products`)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  //TODO fix memory leak
  useEffect(() => {
    Error.on('error', error => {
      setError(error)
      setLoading(false)
    })
  }, [])

  if (match.params.type !== 'create' && match.params.type !== 'edit')
    return <h1>Access Denied</h1>
  return (
    <>
      <Header location={location.pathname} history={history} />
      <Container>
        <div style={style}>
          <Form loading={loading}>
            <Form.Input
              label="name"
              placeholder="name"
              onChange={({ target }) => changeHandler('name', target.value)}
            />
            <Form.Input
              label="slug"
              placeholder="slug"
              onChange={({ target }) => changeHandler('slug', target.value)}
            />
            <Form.Input
              label="image"
              placeholder="image"
              onChange={({ target }) => changeHandler('image', target.value)}
            />
            <Form.Input
              label="description"
              placeholder="description"
              onChange={({ target }) =>
                changeHandler('description', target.value)
              }
            />
            <Form.Input
              label="regular_price"
              placeholder="regular_price"
              onChange={({ target }) =>
                changeHandler('regular_price', Number(target.value))
              }
            />
            <Form.Input
              label="sale_price"
              placeholder="sale_price"
              onChange={({ target }) =>
                changeHandler('sale_price', Number(target.value))
              }
            />
            <Form.Input
              label="date_on_sale_from"
              placeholder="date_on_sale_from"
              onChange={({ target }) =>
                changeHandler('date_on_sale_from', target.value)
              }
            />
            <Form.Input
              label="date_on_sale_to"
              placeholder="date_on_sale_to"
              onChange={({ target }) =>
                changeHandler('date_on_sale_to', target.value)
              }
            />
            <Form.Input
              label="manage_stock"
              placeholder="manage_stock"
              onChange={({ target }) =>
                changeHandler('manage_stock', target.value === 'true')
              }
            />
            <Form.Input
              label="stock_quantity"
              placeholder="stock_quantity"
              onChange={({ target }) =>
                changeHandler('stock_quantity', Number(target.value))
              }
            />
            <Form.Input
              placeholder="sku"
              label="sku"
              onChange={({ target }) => changeHandler('sku', target.value)}
            />
            {error &&
              error.map(error => (
                <Message negative key={error.message}>
                  <Message.Header>{error.message}</Message.Header>
                </Message>
              ))}
          </Form>
          <hr />
          <Button onClick={clickHandler}>{match.params.type}</Button>
        </div>
      </Container>
      <Footer />
    </>
  )
}

const createProduct = gql`
  mutation Product($product: productInput!) {
    createProduct(product: $product) {
      id
    }
  }
`
const editProduct = gql`
  mutation Product($product: productInput!, $id: ID!) {
    editProduct(product: $product, id: $id) {
      id
    }
  }
`
