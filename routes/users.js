const router = require('express').Router()
const userController = require('../controllers/userControllers')

// router.get('/', userController.findAll)

router.route('/')
      .get(userController.findAll)
      .post(userController.create)

// router.route('/username/:username')
//       .get(userController.findByUsername)

router.route('/auth/:id')
      .get(userController.findByAuthID)

router.route('/:id/coupons')
      .post(userController.addCoupon)
      .delete(userController.removeCoupon)

router.route('/:id')
      .get(userController.findByID)
      .put(userController.update)
      .delete(userController.delete)
      



module.exports = router