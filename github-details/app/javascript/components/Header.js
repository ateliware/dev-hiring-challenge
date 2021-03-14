import React from "react";
import { Heading, Flex } from "@chakra-ui/react";

const Header = (props) => (
  (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="linkedin.500"
      color="white"
      mb="5"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Github Details
        </Heading>
      </Flex>
    </Flex>
  )
);

export default Header;
