/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co"
      },
      {
        protocol: "https",
        hostname: "4opefmb4eg.ufs.sh",
        pathname: "/f/*",
      },
    ]
  }
};

export default config;
