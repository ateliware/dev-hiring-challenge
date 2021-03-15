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
import { GoRepoForked, GoStar, GoPrimitiveDot } from "react-icons/go";

const InfoItem = ({
  Icon,
  text,
}) => (
  <Box
    as="span"
    mr="2"
    p="1"
    color="gray.600"
    fontSize="sm"
    d="flex"
    flexDirection="row"
    alignItems="center"
    borderWidth="1px"
    borderRadius="lg"
  >
    <Icon />

    <Text ml="2">
      {text}
    </Text>
  </Box>
)

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
          <InfoItem
            Icon={GoStar}
            text={stargazerCount}
          />

          <InfoItem
            Icon={GoRepoForked}
            text={forkCount}
          />

          <InfoItem
            Icon={GoPrimitiveDot}
            text={primaryLanguage.name}
          />
        </Flex>
      </Box>
    </LinkBox>
  )
};

export default RepositoryCard;
