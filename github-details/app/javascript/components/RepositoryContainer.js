import React from "react";
import { useQuery } from "@apollo/client";

import RepositoryCard from "components/RepositoryCard";
import { REPOSITORY_QUERY } from "graphql/repositoryQuery";

const RepositoryContainer = ({
  repository,
}) => {
  const {
    id,
    name,
    organization,
  } = repository;
  const owner = organization.slug;

  const { data, error } = useQuery(REPOSITORY_QUERY, {
    variables: {
      owner,
      name,
    },
  });

  if (!data) {
    return null;
  }

  const repo = data.repository;

  return (
    <RepositoryCard
      organization_id={organization.id}
      repository={repo}
      key={id}
      is_saved
    />
  )
};

export default RepositoryContainer;
