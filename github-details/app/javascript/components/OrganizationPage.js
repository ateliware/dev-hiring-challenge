import React from "react";
import { Text } from "@chakra-ui/react";
import { useQuery } from '@apollo/client';

import withLayout from "hocs/withLayout";
import { ORGANIZATION_QUERY } from "graphql/organizationQuery";

const OrganizationPage = ({
  organization,
}) => {
  const {
    name,
    slug,
  } = organization;

  const { loading, error, data } = useQuery(ORGANIZATION_QUERY, {
    variables: {
      slug,
    },
  });

  const repos = data?.organization?.pinnedItems?.nodes || [];

  return (
    <>
      <Text>
        {name}
      </Text>

      {
        repos.map((repo) => (
          <div key={repo.id}>
            <p>{repo.name}</p>
            <p>{repo.description}</p>

            <span>{repo.forkCount}</span>
            <span>{repo.stargazerCount}</span>
          </div>
        ))
      }
    </>
  )
};

export default withLayout(OrganizationPage);
