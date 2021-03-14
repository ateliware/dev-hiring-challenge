import React from "react";
import {
  Container,
} from "@chakra-ui/react"

import Header from "components/Header";

const Layout = ({ children }) => (
  <>
    <Header />

    <Container
      maxW={1280}
      minHeight="100vh"
    >
      {children}
    </Container>
  </>
);

export default Layout;
