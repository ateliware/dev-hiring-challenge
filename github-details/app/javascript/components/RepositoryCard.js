import React from "react";
import {
  Box,
  LinkOverlay,
  LinkBox,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import Emoji from "react-emoji-render";
import { GoRepoForked, GoStar } from "react-icons/go"

const RepositoryCard = ({
  repository,
}) => {
  const {
    id,
    name,
    description,
    url,
    stargazerCount,
    forkCount,
    primaryLanguage,
  } = repository;

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
      <Box
        d="flex"
        alignItems="baseline"
        flexDirection="column"
      >
        <Heading size="md" my="2">
          <LinkOverlay href={url}>
            {name}
          </LinkOverlay>
        </Heading>

        <Text mb="3">
          <Emoji text={description} />
        </Text>

        <Flex direction="row">
          <Box as="span" m="2" color="gray.600" fontSize="sm" d="flex" flexDirection="row" alignItems="center">
            <GoStar ml="2" />

            {stargazerCount}
          </Box>

          <Box as="span" m="2" color="gray.600" fontSize="sm" d="flex" flexDirection="row" alignItems="center">
            <GoRepoForked ml="2" />

            {forkCount}
          </Box>
        </Flex>
      </Box>
    </LinkBox>
  )
};

export default RepositoryCard;
