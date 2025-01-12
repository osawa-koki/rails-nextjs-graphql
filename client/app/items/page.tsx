'use client'

import React from 'react'
import { useQuery } from '@apollo/client'
import { Alert, Spinner, Table } from 'react-bootstrap'

import { GET_ITEMS } from '@/graphql/queries/itemQueries'
import type { GetItemsQuery } from '@/graphql/types/itemTypes'

export default function ItemsPage(): React.JSX.Element {
  const { data: queriedItems, loading, error } = useQuery<GetItemsQuery>(GET_ITEMS)

  if (loading) return <Spinner animation='border' />
  if (error != null) return <Alert variant='danger'>{error.message}</Alert>
  if (queriedItems == null) return <Alert variant='danger'>No items found</Alert>

  return (
    <div id='Items'>
      <h1>Items</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {queriedItems.items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
