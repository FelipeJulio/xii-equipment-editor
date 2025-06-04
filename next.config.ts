import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/xii-equipment-editor",
  assetPrefix: "/xii-equipment-editor/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
