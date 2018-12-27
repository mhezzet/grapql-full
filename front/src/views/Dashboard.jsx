import React from 'react'
import Header from '../layouts/Header'
import gql from 'graphql-tag'
import apollo from '../apollo'
import { Container, List, Loader, Icon, Button } from 'semantic-ui-react'
import Footer from '../layouts/Footer'
import useProducts from '../hooks/useProducts'

export default function Dashboard({ location, history }) {
  const products = useProducts()

  const clickHandler = (type, id) =>
    history.push(`/dashboard/products/${type}${id ? '/' + id : ''}`)

  const deleteHandler = id => {
    apollo
      .mutate({ mutation: deleteProduct, variables: { id } })
      .then(({ data }) => {
        history.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Header location={location.pathname} history={history} />
      <Container>
        <div style={{ minHeight: '85vh' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => clickHandler('create')}>New Product</Button>
          </div>
          {!products.length ? (
            <Loader active={true} />
          ) : (
            <List celled>
              {products.map(product => (
                <List.Item key={product.sku}>
                  <List.Content floated="right">
                    <div>
                      <Icon
                        size="large"
                        name="edit"
                        onClick={() => clickHandler('edit', product.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      <Icon
                        size="large"
                        name="delete"
                        onClick={() => deleteHandler(product.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </List.Content>
                  <List.Content>
                    <List.Header as="h2">{product.name}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          )}
        </div>
      </Container>
      <Footer />
    </>
  )
}

const deleteProduct = gql`
  mutation Product($id: ID!) {
    deletProduct(id: $id) {
      id
    }
  }
`
