'use client'

import React, { useMemo, useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { GET_ITEMS } from '@/graphql/queries/itemQueries'
import { CREATE_ITEM } from '@/graphql/mutations/itemMutations'
import type { GetItemsQuery } from '@/graphql/types/itemTypes'

export default function ItemsPage(): React.JSX.Element {
  const { data: queriedItems, loading: querying, error } = useQuery<GetItemsQuery>(GET_ITEMS)
  const [createItem, { loading: creating }] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }]
  })

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>(0)
  const canCreate = useMemo(() => {
    return name.length > 0 && description.length >= 0 && price >= 0
  }, [name, description, price])

  function handleCreateItem(): void {
    createItem({
      variables: {
        name,
        description,
        price
      }
    })
      .then(() => {
        toast.success('Item created successfully')
      })
      .catch((error) => {
        toast.error(`Error creating item: ${error.message}`)
      })
  }

  if (querying) return <Spinner animation='border' />
  if (creating) return <Spinner animation='grow' />
  if (error != null) return <Alert variant='danger'>{error.message}</Alert>
  if (queriedItems == null) return <Alert variant='danger'>No items found</Alert>

  return (
    <div id='Items'>
      <h1>Items</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </Form.Group>
        <Button type='button' className='mt-3' onClick={handleCreateItem} disabled={!canCreate}>Create</Button>
      </Form>
      <hr />
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
