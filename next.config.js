const path = require('path');
module.exports = {
  env: {
    // BACKEND_BASE_URL: 'http://localhost:3000',
    // BASE_URL: 'http://localhost:3001',
    BACKEND_BASE_URL: 'https://api.jinpost.com',
    BASE_URL: 'https://jinpost.com',

  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: true,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }
    return config
  }
};
