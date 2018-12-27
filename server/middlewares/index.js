import authorization from './authorization'

export default function(request) {
  return {
    authorization: authorization(request)
  }
}
