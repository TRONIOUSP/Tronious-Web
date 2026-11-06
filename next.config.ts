import type { NextConfig } from "next";

// The GitHub Pages workflow sets STATIC_EXPORT=true (and NEXT_BASE_PATH for the
// repository sub-path). Everywhere else — `next dev`, `next start`, Playwright —
// these are unset, so the app builds and runs exactly as before.
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  /* config options here */
  // Next.js rejects Cache Components (PPR) in export mode ("PPR cannot be
  // enabled in export mode"). Every route here is already fully static, so
  // nothing is lost by turning them off for the Pages build only.
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  ...(staticExport && {
    output: "export",
    basePath: process.env.NEXT_BASE_PATH || undefined,
    // The default image loader needs a server, which a static host does not have.
    images: { unoptimized: true },
  }),
};

export default nextConfig;
