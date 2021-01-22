const path = require('path');
module.exports = {
  // images: {
  //   loader: 'imgix',
  //   domains: ['http://localhost:3000'],
  // },
  env: {
    BACKEND_BASE_URL: 'https://jinpost.herokuapp.com',
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
