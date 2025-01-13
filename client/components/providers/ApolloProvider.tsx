'use client'

import React from 'react'

import { type PropsWithChildren } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import setting from '@/setting'

const client = new ApolloClient({
  uri: `${setting.apiPath}/graphql`,
  cache: new InMemoryCache()
})

export default function ApolloClientProvider ({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
