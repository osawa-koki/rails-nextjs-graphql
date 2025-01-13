'use client'

import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { useMutation, useQuery } from '@apollo/client'

import Modal from '@/components/Modal'

import { GET_ITEM } from '@/graphql/queries/itemQueries'
import { type GetItemQuery } from '@/graphql/types/itemTypes'
import { UPDATE_ITEM } from '@/graphql/mutations/itemMutations'

interface ItemModalProps {
  itemId: string | null
  closeModal: () => void
}

export default function ItemModal (props: ItemModalProps): React.JSX.Element {
  const { itemId, closeModal } = props

  const { data: queriedItem, loading: querying, error: queryError } = useQuery<GetItemQuery>(GET_ITEM, {
    variables: { id: itemId },
    skip: itemId == null
  })
  const [updateItem, { loading: updating, error: updateError }] = useMutation(UPDATE_ITEM, {
    refetchQueries: itemId != null ? [{ query: GET_ITEM, variables: { id: itemId } }] : []
  })

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  function resetForm (): void {
    setName(queriedItem?.item.name ?? '')
    setDescription(queriedItem?.item.description ?? '')
    setPrice(queriedItem?.item.price ?? 0)
  }

  function updateItemForm (): void {
    updateItem({
      variables: {
        id: itemId,
        name,
        description,
        price
      }
    })
      .then(() => {
        toast.success('Item updated successfully')
      })
      .catch((error: Error) => {
        toast.error(`Error: ${error.message}`)
      })
  }

  useEffect(() => {
    if (queriedItem == null) return
    setName(queriedItem.item.name)
    setDescription(queriedItem.item.description)
    setPrice(queriedItem.item.price)
  }, [queriedItem])

  if (itemId == null) return <></>

  if (querying) return <Spinner animation='border' />
  if (updating) return <Spinner animation='border' />
  if (queryError != null) return <Alert variant='danger'>{queryError.message}</Alert>
  if (updateError != null) return <Alert variant='danger'>{updateError.message}</Alert>
  if (queriedItem == null) return <Alert variant='danger'>No item found</Alert>

  return (
    <>
      <Modal modalIsOpen={itemId != null} closeModal={closeModal}>
        <Table>
          <tbody>
            <tr>
              <td>名前</td>
              <td>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />
              </td>
            </tr>
            <tr>
              <td>説明</td>
              <td>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                />
              </td>
            </tr>
            <tr>
              <td>価格</td>
              <td>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => { setPrice(Number(e.target.value)) }}
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
        <Button className="mt-3 me-3" onClick={updateItemForm}>更新</Button>
        <Button className="mt-3 me-3" onClick={resetForm}>リセット</Button>
      </Modal>
    </>
  )
}
