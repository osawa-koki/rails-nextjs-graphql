export interface GetItemsQuery {
  items: Array<{
    id: string
    name: string
    price: number
  }>
}

export interface GetItemQuery {
  item: {
    id: string
    name: string
    price: number
    description: string
    updatedAt: string
    createdAt: string
  }
}
