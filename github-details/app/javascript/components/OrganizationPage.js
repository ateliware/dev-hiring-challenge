import React from "react";
import {
  Heading,
  Text,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useQuery } from '@apollo/client';

import withLayout from "hocs/withLayout";
import RepositoryCard from "components/RepositoryCard";
import { ORGANIZATION_QUERY } from "graphql/organizationQuery";

const OrganizationPage = ({
  organization,
}) => {
  const {
    id,
    name: organizationName,
    slug,
    description,
    is_verified,
    blog,
    repositories,
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
        {organizationName}
      </Heading>

      <Text>
        {description}
      </Text>

      <Flex>
        <Text>{blog}</Text>

        {
          is_verified && (
            <Badge colorScheme="green" variant="outline">
              verified
            </Badge>
          )
        }
      </Flex>

      {
        repos.map((repo) => {
          const is_saved = repositories.find(({ name }) => repo.name === name);

          return (
            <RepositoryCard
              organization_id={id}
              repository={repo}
              key={repo.id}
              is_saved={is_saved}
            />
          );
        })
      }
    </>
  )
};

export default withLayout(OrganizationPage);
