const config = {
  development: {
    prefix: {
      // lb: 'http://18.141.121.141:8080'
<<<<<<< HEAD
      lb: 'http://192.168.23.126:8080'
      // lb: 'http://localhost:8080'
=======
      // lb: 'http://192.168.23.126:8080/backend'
      lb: 'http://localhost:9527/backend'
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
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
