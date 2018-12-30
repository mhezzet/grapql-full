import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { GET_PRODUCT } from '../store'
import Layout from '../layouts/Layout'
import Message from '../components/Message'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

export default function Product({ match, location, history }) {
  const [count, setCount] = useState(1)
  const [color, setColor] = useState('')
  return (
    <Layout location={location} history={history}>
      <Query query={GET_PRODUCT} variables={{ slug: match.params.slug }}>
        {({ data: { product }, error, loading }) => {
          if (loading)
            return (
              <div className="center" style={{ height: '80vh' }}>
                <CircularProgress />
              </div>
            )

          if (error)
            return (
              <div className="center" style={{ height: '80vh' }}>
                <Message variant="error" message={error.message} />
              </div>
            )
          return (
            <div className="center">
              <Paper
                style={{
                  padding: '2rem',
                  margin: '2rem',
                  maxWidth: '100vw',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ minHeight: '500px', minWidth: '400px' }}
                />
                <Typography variant="h3" align="center">
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom align="center">
                  {`$${product.regular_price}`}
                </Typography>
                <TextField
                  style={{ width: '50%' }}
                  id="standard-number"
                  label="Count"
                  value={count}
                  onChange={e => e.target.value > 0 && setCount(e.target.value)}
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
                <TextField
                  style={{ width: '50%' }}
                  id="standard-select-currency"
                  select
                  label="Color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  margin="normal"
                >
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                </TextField>
                <hr />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '70%' }}
                >
                  Add to Cart ( $ {product.regular_price * count} )
                </Button>
                <hr />
                <Typography style={{ marginBottom: '10px' }} variant="h5">
                  Description
                </Typography>
                <Typography variant="body1">{product.description}</Typography>
              </Paper>
            </div>
          )
        }}
      </Query>
    </Layout>
  )
}
