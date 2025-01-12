import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
  mutation CreateItem($name: String!, $description: String!, $price: Float!) {
    createItem(input: { name: $name, description: $description, price: $price }) {
      item {
        id
        name
        description
        price
      }
      errors
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(input: { id: $id }) {
      item {
        id
      }
      errors
    }
  }
`;
