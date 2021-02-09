const path = require('path');
module.exports = {
  // images: {
  //   loader: 'imgix',
  //   domains: ['http://localhost:3000'],
  // },
  env: {
    // BACKEND_BASE_URL: 'http://localhost:3000',
    // BASE_URL: 'http://localhost:3001',
    BACKEND_BASE_URL: 'http://54.251.217.105',
    BASE_URL: 'http://jinpost.com',

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
