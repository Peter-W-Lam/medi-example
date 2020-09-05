const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-r8uf1bz2.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://medi-example',
issuer: 'https://dev-r8uf1bz2.us.auth0.com/',
algorithms: ['RS256']
});


module.exports = jwtCheck