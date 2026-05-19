import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   compress: true,
//   poweredByHeader: false,

//   images: {
//     formats: ["image/avif", "image/webp"],
//     remotePatterns: [
//       { protocol: "https", hostname: "avatars.githubusercontent.com" },
//       { protocol: "https", hostname: "github-readme-stats.vercel.app" },
//       { protocol: "https", hostname: "raw.githubusercontent.com" },
//     ],
//   },

//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           { key: "X-DNS-Prefetch-Control", value: "on" },
//           { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
//           { key: "X-Frame-Options", value: "SAMEORIGIN" },
//           { key: "X-Content-Type-Options", value: "nosniff" },
//           { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
//           { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
//         ],
//       },
//     ];
//   },

//   experimental: {
//     optimizePackageImports: ["lucide-react", "framer-motion"],
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a static 'out' folder instead of requiring a Node server
  images: {
    unoptimized: true, // Disables standard image optimization incompatible with static exports
  },
  basePath: '/portfolio', // Replace with your exact GitHub repository name
};

export default nextConfig;
