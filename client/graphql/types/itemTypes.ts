export interface GetItemsQuery {
  items: Array<{
    id: string
    name: string
    price: number
  }>
}
