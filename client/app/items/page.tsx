'use client'

import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_ITEMS } from '@/graphql/queries/itemQueries'

export default function ItemsPage(): React.JSX.Element {
  const { data, loading, error } = useQuery(GET_ITEMS)

  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>

  return (
    <div id='Items'>
      <h1>Items</h1>
      {JSON.stringify(data)}
    </div>
  )
}
