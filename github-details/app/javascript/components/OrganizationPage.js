import React from "react";
import { Heading } from "@chakra-ui/react";
import { useQuery } from '@apollo/client';

import withLayout from "hocs/withLayout";
import RepositoryCard from "components/RepositoryCard";
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
      <Heading size="lg" my="5">
        {name}
      </Heading>

      {
        repos.map((repo) => (
          <RepositoryCard repository={repo} key={repo.id} />
        ))
      }
    </>
  )
};

export default withLayout(OrganizationPage);
