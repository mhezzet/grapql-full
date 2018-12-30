import React from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  GET_AUTH,
  GET_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  client
} from '../store'
import Layout from '../layouts/Layout'
import Message from '../components/Message'
import Form from '../components/Form'
import CircularProgress from '@material-ui/core/CircularProgress'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'

export default function ProductForm({ location, history, match }) {
  return (
    <Layout location={location} history={history}>
      <Paper>
        <Query query={GET_AUTH}>
          {({ data }) => {
            if (!data.auth)
              return (
                <div className="center" style={{ height: '80vh' }}>
                  <Message variant="error" message="ur not admin" />
                </div>
              )

            if (match.params.type === 'edit')
              return (
                <Query
                  query={GET_PRODUCT}
                  variables={{ slug: match.params.slug }}
                >
                  {({ data, error, loading, refetch }) => {
                    if (loading) return <p>Loading</p>
                    if (error)
                      return (
                        <div className="center" style={{ height: '80vh' }}>
                          <Message variant="error" message="ur not admin" />
                        </div>
                      )
                    return (
                      <Mutation mutation={EDIT_PRODUCT}>
                        {(
                          editProduct,
                          { error: submitError, loading, client }
                        ) => {
                          if (loading)
                            return (
                              <div
                                className="center"
                                style={{ height: '80vh' }}
                              >
                                <CircularProgress />
                              </div>
                            )
                          return (
                            <>
                              {submitError &&
                                submitError.graphQLErrors.map(err => (
                                  <Message
                                    variant="error"
                                    message={err.message}
                                    key={err.message}
                                  />
                                ))}
                              {submitError &&
                                submitError.graphQLErrors.length === 0 && (
                                  <Message
                                    variant="error"
                                    message="all field required"
                                  />
                                )}
                              <Form
                                old={data.product}
                                type={match.params.type}
                                submitHandler={product => {
                                  editProduct({
                                    variables: {
                                      product: _.omit(product, [
                                        'id',
                                        '__typename'
                                      ]),
                                      id: data.product.id
                                    }
                                  }).then(() => {
                                    client.cache.writeQuery({
                                      query: GET_PRODUCT,
                                      data: { product }
                                    })
                                    history.push('/dashboard/products')
                                  })
                                }}
                              />
                            </>
                          )
                        }}
                      </Mutation>
                    )
                  }}
                </Query>
              )
            return (
              <Mutation mutation={CREATE_PRODUCT}>
                {(createProduct, { loading, error: submitError2 }) => {
                  if (loading)
                    return (
                      <div className="center" style={{ height: '80vh' }}>
                        <CircularProgress />
                      </div>
                    )

                  return (
                    <>
                      {submitError2 &&
                        submitError2.graphQLErrors.map(err2 => (
                          <Message
                            variant="error"
                            message={err2.message}
                            key={err2.message}
                          />
                        ))}
                      {submitError2 &&
                        submitError2.graphQLErrors.length === 0 && (
                          <Message
                            variant="error"
                            message="all field required"
                          />
                        )}
                      <Form
                        submitHandler={product => {
                          createProduct({
                            variables: { product },
                            update: cache => {
                              client
                                .query({ query: GET_PRODUCTS })
                                .then(data => {
                                  history.push('/')
                                })
                            }
                          })
                        }}
                      />
                    </>
                  )
                }}
              </Mutation>
            )
          }}
        </Query>
      </Paper>
    </Layout>
  )
}
