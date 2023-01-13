const { AUTH0_AUDIENCE } = require('../config/config')
const { AUTH0_ISSUER } = require('../config/config')
const { expressjwt: jwt } = require('express-jwt')
const  jwksRsa  = require('jwks-rsa')

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${AUTH0_ISSUER}.well-known/jwks.json`
    }),
  
    audience: AUTH0_AUDIENCE,
    issuer: AUTH0_ISSUER,
    algorithms: ['RS256']
  })
  
  module.exports = {
    checkJwt
  }