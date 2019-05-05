import { ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost'

import { GITHUB_ACCESS_TOKEN } from '~/utils/constants'

export default () => {
  const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

  const middlewareLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(GITHUB_ACCESS_TOKEN)
    operation.setContext({
      headers: { Authorization: `Bearer ${token}` }
    })
    return forward(operation)
  })

  return {
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
  }
}
