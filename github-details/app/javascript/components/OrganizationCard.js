import React from "react";
import {
  Box,
  Image,
  LinkOverlay,
} from "@chakra-ui/react";

const OrganizationCard = ({
  name,
  slug,
  description,
  avatar_url,
}) => {
  return (
    <LinkOverlay href={`/organizations/${slug}`}>
      <Box
        mt="5"
        p="6"
        d="flex"
        maxW="lg"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="lg"
        flexDirection="row"
      >
        <Image
          width={50}
          height={50}
          src={avatar_url}
          alt={name}
          mr="5"
        />

        <Box
          d="flex"
          alignItems="baseline"
          flexDirection="column"
        >
          <Box
            fontWeight="semibold"
            as="h3"
            lineHeight="tight"
          >
            {name}
          </Box>

          <Box fontWeight="normal">
            {description}
          </Box>
        </Box>
      </Box>
    </LinkOverlay>
  )
};

export default OrganizationCard;
