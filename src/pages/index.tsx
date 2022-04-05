import type { NextPage } from 'next';
import styles from '../common/styles/Home.module.css';
import Hero from '../common/partials/Hero';
import Features from '../common/partials/Features';
import { Stack } from 'react-bootstrap';

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Stack gap={2}>
        <Hero />
        <Features />
      </Stack>
    </main>
  );
};

export default Home;
