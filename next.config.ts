import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arashaltafi.ir",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
