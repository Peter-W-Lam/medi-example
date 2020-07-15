const router = require('express').Router();
const userRoutes = require('./users')
const path = require('path');

router.use('/api/users', userRoutes)

// If no API routes are hit, send the React app
router.use(function(req, res) {
	console.log("in router use")
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = router;