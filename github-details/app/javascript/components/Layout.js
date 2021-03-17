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
    >
      {children}
    </Container>
  </>
);

export default Layout;
