const withRoutes = require("nextjs-routes/config")({
  outDir: "src/types",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.zerorenovation.com']
  },
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
}

module.exports = withRoutes(nextConfig);
