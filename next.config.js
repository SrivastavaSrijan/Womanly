/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV_URL: 'http://localhost:3000',
    PROD_URL: 'https://womanly.srijansrivastava.tech',
  },
};

module.exports = nextConfig;
