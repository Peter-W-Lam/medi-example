const router = require('express').Router()
const couponController = require('../controllers/couponControllers')
const checkJwt = './verifyToken'
const jwtAuthz = require('express-jwt-authz');

const checkScopes = jwtAuthz([ 'edit:coupons' ]);

// router.get('/', checkScopes, couponController.findAll)
// router.post('/', couponController.create)

router.route('/')
      .get(couponController.findAll)
      .post(checkScopes, couponController.create)

router.route('/:id')   
      .get(couponController.findById)
      .delete(checkScopes, couponController.delete)
      .put(checkScopes, couponController.update)

router.route('/:coupon_id/offers/')
      .get(couponController.findAllOffers)
      .post(checkScopes, couponController.createOffer)

router.route('/:coupon_id/offers/:offer_id')
      .get(couponController.findOfferById)
      .put(checkScopes, couponController.updateOffer)
      .delete(checkScopes, couponController.deleteOffer)

module.exports = router