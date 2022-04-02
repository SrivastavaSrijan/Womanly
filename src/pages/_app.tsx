import type { AppProps } from 'next/app';
import { ThemeProvider, Container, SSRProvider } from 'react-bootstrap';

import { NavigationBar } from '../common/components/NavigationBar';
import { Header } from '../common/components/Header';

import '../common/styles/globals.scss';
function WomanlyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SSRProvider>
        <Header desc="Welcome to womanly!" />
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        >
          <NavigationBar />
          <Container fluid className="p-0">
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </SSRProvider>
    </>
  );
}

export default WomanlyApp;
