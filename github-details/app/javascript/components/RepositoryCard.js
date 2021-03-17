import React, { useCallback, useState } from "react";
import {
  Box,
  LinkOverlay,
  LinkBox,
  Heading,
  Text,
  Flex,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import Emoji from "react-emoji-render";
import { GoRepoForked, GoStar, GoPrimitiveDot } from "react-icons/go";
import axios from "axios";

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
  organization_id,
  is_saved,
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

  const toast = useToast();

  const [disabled, setDisabled] = useState(false);

  const handleSave = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();

    const token = document.querySelector("[name=csrf-token]").content;
      axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

      axios.post("/repositories.json", {
        repository: {
          name,
          organization_id,
        }
      })
        .then(() => {
          setDisabled(true);

          toast({
            title: "Repository saved successfully",
            status: "success",
          });
        })
        .catch(() => {
          console.log("error");

          toast({
            title: "Failed to save repository",
            status: "error",
          });
        });
  }, [
    id,
  ]);

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

        <Flex>
          <Flex>
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

          <Spacer />

          <Button
            colorScheme="blue"
            size="sm"
            disabled={disabled || is_saved}
            onClick={handleSave}
          >
            Save repository
          </Button>
        </Flex>
      </Box>
    </LinkBox>
  )
};

export default RepositoryCard;
