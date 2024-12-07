module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pwa: {
    workboxOptions: {
        skipWaiting: true
    }
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8080,
    host:'0.0.0.0',
    compress: true,
    disableHostCheck: true,
    public:'172.16.121.239',
  }
};
