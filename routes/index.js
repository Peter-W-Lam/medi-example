const router = require('express').Router();
const userRoutes = require('./users')
const path = require('path');

router.use('/api/users', userRoutes)

// If no API routes are hit, send the React app
router.use(function(req, res) {
	// console.log("in router")
	res.sendFile(path.join(__dirname, '../medi/client/build/index.html'));
});


module.exports = router;