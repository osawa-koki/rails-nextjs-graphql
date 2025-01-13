'use client'

import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'

import { useQuery } from '@apollo/client'

import Modal from '@/components/Modal'

import { GET_ITEM } from '@/graphql/queries/itemQueries'
import { GetItemQuery } from '@/graphql/types/itemTypes'

interface ItemModalProps {
  itemId: string
  modalIsOpen: boolean
  closeModal: () => void
}

export default function ItemModal (props: ItemModalProps): React.JSX.Element {
  const { itemId, modalIsOpen, closeModal } = props

  const { data: queriedItem, loading: querying, error } = useQuery<GetItemQuery>(GET_ITEM, {
    variables: { id: itemId }
  })

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  function resetForm(): void {
    setName(queriedItem?.item.name ?? '')
    setDescription(queriedItem?.item.description ?? '')
    setPrice(queriedItem?.item.price ?? 0)
  }

  useEffect(() => {
    if (queriedItem == null) return
    setName(queriedItem.item.name)
    setDescription(queriedItem.item.description)
    setPrice(queriedItem.item.price)
  }, [queriedItem])

  if (querying) return <Spinner animation='border' />
  if (error != null) return <Alert variant='danger'>{error.message}</Alert>
  if (queriedItem == null) return <Alert variant='danger'>No item found</Alert>

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <Table>
          <tbody>
            <tr>
              <td>名前</td>
              <td>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>説明</td>
              <td>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>価格</td>
              <td>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </td>
            </tr>
            <tr>
              <td>更新日時</td>
              <td>{queriedItem.item.updatedAt}</td>
            </tr>
            <tr>
              <td>作成日時</td>
              <td>{queriedItem.item.createdAt}</td>
            </tr>
          </tbody>
        </Table>
        <Button className="mt-3 me-3">更新</Button>
        <Button className="mt-3 me-3" onClick={resetForm}>リセット</Button>
      </Modal>
    </>
  )
}
