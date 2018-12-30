import gql from 'graphql-tag'

export const SET_AUTH = gql`
  mutation {
    setAuth @client
  }
`

export const RESET_AUTH = gql`
  mutation {
    resetAuth @client
  }
`
export const GET_AUTH = gql`
  {
    auth @client
  }
`
