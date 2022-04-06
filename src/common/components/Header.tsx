import React from 'react';
import Head from 'next/head';

interface IHead {
  title: string;
  desc?: string;
}

function Header({ title, desc }: IHead) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="author" content="Srijan" />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://apps.srijansrivastava.tech/a-basic-html5-template/" />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="./images/preview.png" />

      <link rel="apple-touch-icon" sizes="180x180" href="./favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="./favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./favicons/favicon-16x16.png" />
      <link rel="manifest" href="./favicons/site.webmanifest" />
      <link rel="mask-icon" href="./favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="./favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="./favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&family=Tenor+Sans&display=swap" rel="stylesheet" />
    </Head>
  );
}
Header.defaultProps = {
  desc: 'Welcome to womanly!',
};
export default Header;
