import React from "react";
import {
  Container,
  Flex,
  Text,
} from "@chakra-ui/react"

const Layout = ({ children }) => (
  <Container
    maxW={1280}
    minHeight="100vh"
  >
    {children}
  </Container>
);

export default Layout;
