import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withSvgr = require('next-plugin-svgr');

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
};

export default withSvgr(nextConfig);
