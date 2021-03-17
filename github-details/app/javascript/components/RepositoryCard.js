import React, { useCallback, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Spacer,
  useToast,
  Link,
} from "@chakra-ui/react";
import Emoji from "react-emoji-render";
import {
  GoRepoForked,
  GoStar,
  GoPrimitiveDot,
  GoLogoGithub,
} from "react-icons/go";
import axios from "axios";

const token = document.querySelector("[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

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
  repository_id,
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
  const [visible, setVisible] = useState(true);

  const handleSave = useCallback(() => {
    axios.post("/repositories.json", {
      repository: {
        name,
        organization_id,
      }
    })
      .then(() => {
        toast({
          title: "Repository saved successfully!",
          description: "It'll be available in your saved repositories.",
          status: "success",
        });

        setDisabled(true);
      })
      .catch(() => {
        toast({
          title: "Failed to save repository",
          status: "error",
        });
      });
  }, [
    id,
  ]);

  const handleRemove = useCallback(() => {
    axios.delete(`/repositories/${repository_id}.json`)
      .then(() => {
        toast({
          title: "Repository removed successfully",
          description: "You can still add it again in the future.",
          status: "success",
        });

        setVisible(false);
      })
      .catch(() => {
        toast({
          title: "Failed to remove repository",
          status: "error",
        });
      });
  }, [
    repository_id,
  ]);

  if (!visible) {
    return null;
  }

  return (
    <Box
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
          {name}
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

            {
              primaryLanguage && (
                <InfoItem
                  Icon={GoPrimitiveDot}
                  text={primaryLanguage.name}
                />
              )
            }
          </Flex>

          <Spacer />

          <Button
            colorScheme="blue"
            size="sm"
            mr="2"
            disabled={disabled || is_saved}
            onClick={handleSave}
          >
            Save repository
          </Button>

          {
            !!repository_id && (
              <Button
                colorScheme="red"
                size="sm"
                mr="2"
                onClick={handleRemove}
              >
                Remove repository
              </Button>
            )
          }

          <Link isExternal href={url}>
            <Button
              colorScheme="linkedin"
              size="sm"
            >
              <Text mr="2">
                See on
              </Text>

              <GoLogoGithub size="3rem" />
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
};

export default RepositoryCard;
