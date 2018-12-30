import React from 'react'
import { Query } from 'react-apollo'
import { GET_PRODUCTS } from '../store'
import Layout from '../layouts/Layout'
import Message from '../components/Message'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper'

export default function Gallery({ history, location }) {
  return (
    <Layout history={history} location={location}>
      <Paper style={{ margin: '1rem' }}>
        <Typography variant="h1" align="center">
          Products
        </Typography>
        <Query query={GET_PRODUCTS}>
          {({ data, error, loading }) => {
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

            if (data.products.length === 0)
              return (
                <div className="center" style={{ height: '80vh' }}>
                  <Message variant="warning" message="there is no products" />
                </div>
              )

            return (
              <GridList
                cellHeight={248}
                cols={3}
                style={{ justifyContent: 'center' }}
              >
                {data.products.map(product => (
                  <Card
                    style={{ maxWidth: 345, margin: '1rem' }}
                    key={product.id}
                    raised
                    onClick={() => {
                      history.push(`/products/${product.slug}`)
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        image={product.image}
                        title={product.name}
                        style={{ height: '150px' }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography component="p">
                          {product.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </GridList>
            )
          }}
        </Query>
      </Paper>
    </Layout>
  )
}
