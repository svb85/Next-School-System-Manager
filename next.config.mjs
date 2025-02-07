// next.config.js
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: false,
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Настройки для клиентской части
      config.watchOptions = {
        poll: 1000, // Проверка изменений каждую секунду
        aggregateTimeout: 300,
        ignored: /node_modules/, // Игнорируем изменения в node_modules
      };
    }
    return config;
  },
};
