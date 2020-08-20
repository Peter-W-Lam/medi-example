const router = require('express').Router()
const emailController = require('../controllers/emailControllers')

// TODO: Secure routes with JWT Tokens?
router.route('/')
      .post(emailController.verifyHealthcareEmail);
router.route('/confirm/:token')
      .get(emailController.confirmEmail)

module.exports = router