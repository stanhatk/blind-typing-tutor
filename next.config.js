import path from 'path';
import { fileURLToPath } from 'url';
import { HTML_LIMITED_BOT_UA_RE } from 'next/dist/shared/lib/router/utils/html-bots.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Ensure trailing slashes are handled consistently
  trailingSlash: false,

  // Output directory
  distDir: '.next',

  // Next streams metadata into <body> for Googlebot by default. Google ignores
  // rel=canonical outside <head>, so render metadata in <head> for it too.
  htmlLimitedBots: new RegExp(`Googlebot|${HTML_LIMITED_BOT_UA_RE.source}`, 'i'),
};

export default nextConfig;
