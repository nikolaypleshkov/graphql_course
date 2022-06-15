import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Container className="main-content">
          <Component {...pageProps} />
        </Container>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
