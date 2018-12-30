import gql from 'graphql-tag'

export default gql`
  type Mutation {
    setAuth: Boolean!
    resetAuth: Boolean!
  }
  type Query {
    auth: Boolean!
  }
`
