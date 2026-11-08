import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a minimal Node.js server bundle for the Lightsail deployment.
  // `public` and `.next/static` are added to the release by GitHub Actions.
  output: "standalone",
};

export default nextConfig;
