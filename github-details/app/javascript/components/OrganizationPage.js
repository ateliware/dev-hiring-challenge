import React from "react";

import { Text } from "@chakra-ui/react";

import withLayout from "hocs/withLayout";

const OrganizationPage = ({
  organization,
}) => {
  return (
    <Text>
      {organization.name}
    </Text>
  )
};

export default withLayout(OrganizationPage);
