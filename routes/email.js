const router = require('express').Router()
const emailController = require('../controllers/emailControllers')

// TODO: Secure routes with JWT Tokens?
router.route('/')
      .post(emailController.verifyHealthcareEmail);

router.route('/token')
      .post(emailController.findToken)
      
router.route('/confirm/:token')
      .get(emailController.confirmEmail)
router.route('/support')
      .post(emailController.sendSupportEmail)
      
module.exports = router