module.exports = {
  // images: {
  //   loader: 'imgix',
  //   domains: ['http://localhost:3000'],
  // },
  env: {
    BACKEND_BASE_URL: 'http://localhost:3000',
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
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }
    return config
  }
};
