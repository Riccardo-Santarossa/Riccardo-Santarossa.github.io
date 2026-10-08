/** Static export: the site is plain HTML/CSS/JS in out/, hosted on GitHub Pages. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
