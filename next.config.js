module.exports = {
  // images: {
  //   loader: 'imgix',
  //   domains: ['http://localhost:3000'],
  // },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: false,
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
