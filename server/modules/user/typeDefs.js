import { gql } from 'apollo-server-core'

export default gql`
  type Query {
    adminToken: String!
    whoAmI: String!
  }
`
