const router = require('express').Router()
const userController = require('../controllers/userControllers')

router.route('/')
      .get(userController.findAll)
      .post(userController.create)

router.route('/:id')
      .put(userController.update)
module.exports = router