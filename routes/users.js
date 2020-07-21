const router = require('express').Router()
const userController = require('../controllers/userControllers')

router.route('/')
      .get(userController.findAll)
      .post(userController.create)
router.route('/username/')
      .get(userController.findByUsername)
router.route('/:id')
      .get(userController.findByID)
      .put(userController.update)
      .delete(userController.delete)
      

module.exports = router