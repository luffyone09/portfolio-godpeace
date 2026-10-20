import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: false },
      { source: "/about", destination: "/fr", permanent: false },
    ];
  },
};

export default nextConfig;
