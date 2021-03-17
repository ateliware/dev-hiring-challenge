import React from "react";
import {
  Heading,
  Text,
  Flex,
  Badge,
  Spinner,
  Image,
  Link
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GoLink } from "react-icons/go";

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
    avatar_url,
    repositories,
  } = organization;

  const { loading, data } = useQuery(ORGANIZATION_QUERY, {
    variables: {
      slug,
    },
  });

  const repos = data?.organization?.pinnedItems?.nodes || [];

  return (
    <>
      <Flex direction="row" align="center">
        <Image
          width={75}
          height={75}
          src={avatar_url}
          alt={organizationName}
          m="5"
        />

        <Flex direction="column">
          <Heading size="lg" my="5">
            {organizationName}

            {
              is_verified && (
                <Badge colorScheme="green" variant="outline" ml="2">
                  verified
                </Badge>
              )
            }
          </Heading>

          <Text>
            {description}
          </Text>

          <Flex>
            {
              blog && (
                <Flex align="center" color="gray" >
                  <GoLink />

                  <Link mx="2" href={blog} isExternal>
                    {blog}
                  </Link>
                </Flex>
              )
            }
          </Flex>
        </Flex>
      </Flex>

      {
        loading
          ? (
            <Flex grow={1} justify="center" align="center">
              <Spinner />
            </Flex>
          )
          : (
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
        )

      }
    </>
  )
};

export default withLayout(OrganizationPage);
