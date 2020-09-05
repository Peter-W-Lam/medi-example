const router = require('express').Router();
const userRoutes = require('./users')
const couponRoutes = require('./coupons')
const emailRoutes = require('./email')
const path = require('path');
const checkJwt = require('./verifyToken')
const jwtAuthz = require('express-jwt-authz');
const emailControllers = require('../controllers/emailControllers');

const checkScopes = jwtAuthz([ 'edit:coupons' ]);

router.use('/api/users', checkJwt, userRoutes)
router.use('/api/coupons', checkJwt, couponRoutes)
router.use('/api/email', emailRoutes)
// If no API routes are hit, send the React app
router.use(function(req, res) {
	// console.log("in router")
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
  

module.exports = router;