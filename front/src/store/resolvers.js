import { client } from './index'
import { GET_TOKEN } from './actions'

async function setAuth(_, variables, { cache }) {
  try {
    const { data } = await client.query({ query: GET_TOKEN })
    localStorage.setItem('token', data.adminToken)
    cache.writeData({ data: { token: data.adminToken, auth: true } })
  } catch {
    cache.writeData({ data: { token: '', auth: false } })
    localStorage.removeItem('token')
  }
  return null
}

function resetAuth(_, variables, { cache }) {
  cache.writeData({ data: { token: '', auth: false } })
  localStorage.removeItem('token')
  return null
}

function auth(_, variables, { cache }) {
  if (localStorage.getItem('token')) return true
  return false
}

export default {
  Mutation: {
    setAuth,
    resetAuth
  },
  Query: {
    auth
  }
}
