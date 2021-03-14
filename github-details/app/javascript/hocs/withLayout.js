import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Layout from "components/Layout";

const theme = extendTheme({
  fonts: {
    heading: "PT Sans",
    body: "Raleway",
  },
});

const withLayout = (Component) => (props) => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Component {...props} />
    </Layout>
  </ChakraProvider>
);

export default withLayout;
