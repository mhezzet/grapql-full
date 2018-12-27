import ApolloClient from 'apollo-boost'
import EventEmitter from 'events'
import _ from 'lodash'

export const error = new EventEmitter()

const client = new ApolloClient({
  uri: 'http://server/graphql',
  onError: ({ graphQLErrors }) => {
    _.throttle(() => {
      error.emit('error', graphQLErrors)
    }, 1000)
  },
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQ1NzU1MzQ0fQ.cX-diAgUP4w73un1Xz-p7T77J49rU918n6Y6spj23m4'
  }
})

export default client
