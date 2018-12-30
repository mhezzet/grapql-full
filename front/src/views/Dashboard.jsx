import React from 'react'
import Layout from '../layouts/Layout'
import { Query, Mutation } from 'react-apollo'
import CircularProgress from '@material-ui/core/CircularProgress'
import Message from '../components/Message'
import { GET_PRODUCTS, DELETE_PRODUCT, GET_AUTH } from '../store'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'

export default function Dashboard({ location, history }) {
  return (
    <Layout location={location} history={history}>
      <Query query={GET_AUTH}>
        {({ data }) => {
          if (!data.auth)
            return (
              <div className="center" style={{ height: '80vh' }}>
                <Message variant="error" message="ur not admin" />
              </div>
            )
          if (data.auth)
            return (
              <Query query={GET_PRODUCTS}>
                {({ data, loading, error }) => {
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
                    <Paper style={{ margin: '1rem' }}>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          style={{ margin: '0.7rem' }}
                          onClick={() =>
                            history.push('/dashboard/products/create')
                          }
                        >
                          <AddIcon />
                          NEW PRODUCT
                        </Button>
                      </div>
                      {data.products.length === 0 ? (
                        <div className="center" style={{ height: '80vh' }}>
                          <Message
                            variant="warning"
                            message="there is no products"
                          />
                        </div>
                      ) : (
                        <List>
                          {data.products.map(product => (
                            <ListItem key={product.id}>
                              <ListItemAvatar>
                                <Avatar
                                  alt={product.name}
                                  src={product.image}
                                />
                              </ListItemAvatar>
                              <ListItemText primary={product.name} />
                              <ListItemSecondaryAction>
                                <IconButton
                                  aria-label="Edit"
                                  onClick={() =>
                                    history.push(
                                      `/dashboard/products/edit/${product.slug}`
                                    )
                                  }
                                >
                                  <Edit />
                                </IconButton>
                                <Mutation
                                  mutation={DELETE_PRODUCT}
                                  variables={{ id: product.id }}
                                  update={cache => {
                                    let { products } = cache.readQuery({
                                      query: GET_PRODUCTS
                                    })
                                    products = products.filter(
                                      prod => prod.id !== product.id
                                    )
                                    cache.writeQuery({
                                      query: GET_PRODUCTS,
                                      data: { products }
                                    })
                                  }}
                                >
                                  {(deleteProduct, { loading }) => {
                                    if (loading) return <CircularProgress />

                                    return (
                                      <IconButton
                                        aria-label="Delete"
                                        onClick={() => {
                                          deleteProduct()
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )
                                  }}
                                </Mutation>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Paper>
                  )
                }}
              </Query>
            )
        }}
      </Query>
    </Layout>
  )
}
