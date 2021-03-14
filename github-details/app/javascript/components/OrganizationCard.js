import React from "react";
import {
  Box,
  Image,
  LinkOverlay,
  LinkBox,
  Heading,
  Text,
} from "@chakra-ui/react";

const OrganizationCard = ({
  name,
  slug,
  description,
  avatar_url,
}) => {
  return (
    <LinkBox
      mt="5"
      p="6"
      d="flex"
      borderWidth="1px"
      borderRadius="lg"
      flexDirection="row"
      alignItems="center"
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
        <Heading size="md" my="2">
          <LinkOverlay href={`/organizations/${slug}`}>
            {name}
          </LinkOverlay>
        </Heading>

        <Text mb="3">
          {description}
        </Text>
      </Box>
    </LinkBox>
  )
};

export default OrganizationCard;
