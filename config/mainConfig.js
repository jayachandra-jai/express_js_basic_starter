// modules dependencies.
const fs = require('fs')
const dbConfig = require('./dbConfig.js')

module.exports = {
  name: 'API',
  version: '0.0.1',
  port: process.env.PORT || 4000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  db: {
    uri: process.env.MODE === 'prod' ? dbConfig.prodUri : dbConfig.devUri
  },
  accessKeyId: '',
  secretAccessKey: '',
  region: '',
  bucket: '',
  mongoOpt: {
    //ssl: true,
    //sslValidate: true,
    //sslKey: fs.readFileSync(''),
    //sslCert: fs.readFileSync(''),
    keepAlive: 1000
  }
}
