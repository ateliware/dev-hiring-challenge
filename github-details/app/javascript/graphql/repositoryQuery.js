import { gql } from '@apollo/client';

export const REPOSITORY_QUERY = gql`
  query Repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
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
`;
