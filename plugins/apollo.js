import { ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost'

export default () => {
  const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { Authorization: localStorage.getItem('auth._token.github') }
    })
    return forward(operation)
  })

  return {
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
  }
}
