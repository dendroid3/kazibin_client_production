module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8080,
    host:'0.0.0.0',
    compress: true,
    disableHostCheck: true,
    public:'192.168.0.103',
  }

};
