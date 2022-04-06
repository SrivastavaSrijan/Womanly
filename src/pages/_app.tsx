import React from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import { ThemeProvider, Container, SSRProvider } from 'react-bootstrap';

import NavigationBar from '../common/components/NavigationBar';
import Header from '../common/components/Header';

import apolloClient from '../lib/apollo';

import '../common/styles/globals.scss';

function WomanlyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SSRProvider>
        <Header title="Womanly" desc="Welcome to womanly!" />
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
          <NavigationBar />
          <Container fluid className="p-0">
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </SSRProvider>
    </ApolloProvider>
  );
}

export default WomanlyApp;
