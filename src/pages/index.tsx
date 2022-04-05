/* eslint-disable react/function-component-definition */
import React from 'react';
import type { NextPage } from 'next';
import { Stack } from 'react-bootstrap';

import Hero from '../common/partials/Hero';
import Features from '../common/partials/Features';

import styles from '../common/styles/Home.module.css';

interface IHome {
  prop1?: string;
}

const Home: NextPage<IHome> = ({ prop1 }: IHome) => (
  <main className={styles.main}>
    <Stack gap={2}>
      <Hero />
      <Features />
    </Stack>
  </main>
);

Home.defaultProps = {
  prop1: '',
};
export default Home;
