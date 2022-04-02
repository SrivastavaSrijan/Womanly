import type { NextPage } from 'next';
import styles from '../common/styles/Home.module.css';
import Hero from '../common/partials/Hero';

const Home: NextPage = () => {
  return (
    <>
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
};

export default Home;
