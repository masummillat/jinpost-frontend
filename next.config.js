const path = require('path');
module.exports = {
  // images: {
  //   loader: 'imgix',
  //   domains: ['http://localhost:3000'],
  // },
  env: {
    // BACKEND_BASE_URL: 'http://localhost:3000',
    BACKEND_BASE_URL: 'https://jinpost.herokuapp.com',
    BASE_URL: 'https://jinpost-frontend.vercel.app',
    // BASE_URL: 'http://localhost:3001',
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
