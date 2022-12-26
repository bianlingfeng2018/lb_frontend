const config = {
  development: {
    prefix: {
      // lb: 'http://18.141.121.141:8080'
      // lb: 'http://192.168.23.126:8080/backend'
      lb: 'http://localhost:9527/backend'
    }
  },
  production: {
    prefix: {
      lb: ''
    }
  },
  test: {
    prefix: {
      lb: '/api'
    }
  }
}

export default config
