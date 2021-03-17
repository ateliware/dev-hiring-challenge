import React from "react";
import {
  Flex,
  Text,
} from "@chakra-ui/react";

import withLayout from "hocs/withLayout";
import RepositoryContainer from "components/RepositoryContainer";

const RepositoriesList = ({ repositories }) => {
  return (
    <Flex
      direction="column"
      align="center"
      grow={1}
    >
      {
        !repositories.length
        ? (
          <Text fontWeight="bold" mt="5">
            No saved repositories yet.
          </Text>
        )
        : (
          repositories.map((repo) => (
            <RepositoryContainer
              repository={repo}
              key={repo.id}
            />
          ))
        )

      }
    </Flex>
  )
};

export default withLayout(RepositoriesList);
