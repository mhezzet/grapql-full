import React from 'react'
import Header from '../layouts/Header'
import { Container, Card, Loader } from 'semantic-ui-react'
import Footer from '../layouts/Footer'
import useProducts from '../hooks/useProducts'

export default function Gallery({ location, history }) {
  const products = useProducts()

  const clickHandler = id => {
    history.push(`/products/${id}`)
  }

  return (
    <>
      <Header location={location.pathname} history={history} />
      <Loader active={!products.length} />
      <Container>
        <div id="wraper">
          {products.map(product => (
            <Card
              key={product.sku}
              image={product.image}
              header={product.name}
              meta={product.slug}
              description={product.description}
              onClick={() => clickHandler(product.id)}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  )
}
