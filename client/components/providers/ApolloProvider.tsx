'use client'

import { PropsWithChildren } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import setting from '@/setting'

const client = new ApolloClient({
  uri: `${setting.apiPath}/graphql`,
  cache: new InMemoryCache(),
})

export default function ApolloClientProvider({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
