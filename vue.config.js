module.exports = {
    publicPath: "/sso",
    devServer: {
        disableHostCheck: true,
        port: 8081,
    },
    transpileDependencies: [
      'vuetify'
    ],
    pages: {
      index: {
        entry: 'src/main.js',
        title: "App Manager",
      }
    },
  }
