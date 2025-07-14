/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  prerender: {
    pages: ["/", "/about", "/login", "/register", "/browse"], // exclude /browse from prerendering
  },
};

export default nextConfig;
