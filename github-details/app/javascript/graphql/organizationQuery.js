import { gql } from '@apollo/client';

export const ORGANIZATION_QUERY = gql`
  query Organization($slug: String!) {
    organization(login: $slug) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              id
              color
              name
            }
          }
        }
      }
    }
  }
`;
