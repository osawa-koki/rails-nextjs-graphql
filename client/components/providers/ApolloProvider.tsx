'use client'

import { PropsWithChildren } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
})

export default function ApolloClientProvider({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
