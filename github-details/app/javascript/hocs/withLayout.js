import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApolloProvider } from '@apollo/client';

import Layout from "components/Layout";
import { client } from "settings/apolloClient";

const theme = extendTheme({
  fonts: {
    heading: "PT Sans",
    body: "Raleway",
  },
});

const withLayout = (Component) => (props) => (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...props} />
      </Layout>
    </ChakraProvider>
  </ApolloProvider>
);

export default withLayout;
