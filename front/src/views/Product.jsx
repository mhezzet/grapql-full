import React, { useState } from 'react'
import {
  Container,
  Image,
  Loader,
  Button,
  Form,
  Select
} from 'semantic-ui-react'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import useProduct from '../hooks/useProduct'

const style = {
  container: {
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  h2: {
    marginBottom: 0
  }
}

const options = [
  { key: 'b', text: 'Black', value: 'black' },
  { key: 'g', text: 'Gold', value: 'gold' }
]

export default function Product({ match, location, history }) {
  const product = useProduct(match.params.slug)
  const [count, setCount] = useState(1)

  const changeHandler = e => {
    setCount(e.target.value)
  }

  return (
    <>
      <Header location={location.pathname} history={history} />
      <Container>
        <div style={style.container}>
          {!product.image ? (
            <Loader active={true} />
          ) : (
            <>
              <Image bordered={true} src={product.image} size="large" />
              <h2 style={style.h2}>{product.name}</h2>
              <p>$ {product.regular_price}</p>
              <Form widths={'equal'}>
                <Form.Input placeholder="quantity" onChange={changeHandler} />
                <Form.Field
                  control={Select}
                  options={options}
                  placeholder="Color"
                />
              </Form>
              <hr />
              <Button>Add to cart ($ {count * product.regular_price})</Button>
              <hr />
              <p>{product.description}</p>
            </>
          )}
        </div>
      </Container>

      <Footer />
    </>
  )
}
