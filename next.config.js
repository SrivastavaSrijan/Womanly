/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV_URL: 'http://192.168.29.44:3000',
    PROD_URL: 'https://womanly.srijansrivastava.tech',
  },
  images: { domains: ['s.gravatar.com'] },
};

module.exports = nextConfig;
