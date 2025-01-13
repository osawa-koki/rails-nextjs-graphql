import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      description
      price
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      price
    }
  }
`;
