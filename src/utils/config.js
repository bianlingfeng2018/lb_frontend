const config = {
  development: {
    prefix: {
      // lb: 'http://18.141.121.141:8080'
      lb: 'http://192.168.23.126:8080'
      // lb: 'http://localhost:8080'
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
