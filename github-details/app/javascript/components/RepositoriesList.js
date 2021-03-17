import React from "react";
import {
  Flex
} from "@chakra-ui/react";

import withLayout from "hocs/withLayout";
import RepositoryContainer from "components/RepositoryContainer";

const RepositoriesList = ({ repositories }) => {
  return (
    <Flex
      direction="column"
      grow={1}
    >
      {
        repositories.map((repo) => (
          <RepositoryContainer
            repository={repo}
            key={repo.id}
          />
        ))
      }
    </Flex>
  )
};

export default withLayout(RepositoriesList);
