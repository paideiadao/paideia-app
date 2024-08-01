// workaround for react financial charts
// https://github.com/react-financial/react-financial-charts/issues/606
// const withTM = require("next-transpile-modules")([
//   "d3-array",
//   "d3-format",
//   "d3-time",
//   "d3-time-format",
//   "react-financial-charts",
//   "@react-financial-charts/annotations",
//   "@react-financial-charts/axes",
//   "@react-financial-charts/coordinates",
//   "@react-financial-charts/core",
//   "@react-financial-charts/indicators",
//   "@react-financial-charts/interactive",
//   "@react-financial-charts/scales",
//   "@react-financial-charts/series",
//   "@react-financial-charts/tooltip",
//   "@react-financial-charts/utils",
// ]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    WSS_URL: process.env.WSS_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    ERGOAUTH_DOMAIN: process.env.ERGOAUTH_DOMAIN,
    ERGOPAY_DOMAIN: process.env.ERGOPAY_DOMAIN,
    EXPLORER_API: process.env.EXPLORER_API,
    PAIDEIA_API_SECRET: process.env.PAIDEIA_API_SECRET,
  },
  images: {
    domains: ["ergopad-public.s3.us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
