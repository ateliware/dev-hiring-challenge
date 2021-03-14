import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// import Layout from "components/Layout";

const withLayout = (Component) => (props) => (
  <ChakraProvider>
    <Component {...props} />
  </ChakraProvider>
);

export default withLayout;
