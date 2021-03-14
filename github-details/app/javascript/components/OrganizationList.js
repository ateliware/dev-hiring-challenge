import React from "react";
import {
  Flex
} from "@chakra-ui/react";

import withLayout from "hocs/withLayout";
import OrganizationCard from "components/OrganizationCard";

const OrganizationList = ({ organizations }) => {

  return (
    <Flex
      direction="column"
      grow={1}
    >
      {
        organizations.map((organization) => (
          <OrganizationCard key={organization.slug} {...organization} />
        ))
      }
    </Flex>
  )
};

export default withLayout(OrganizationList);
