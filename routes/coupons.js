const router = require('express').Router()
const couponController = require('../controllers/couponControllers')
const checkJwt = './verifyToken'
const jwtAuthz = require('express-jwt-authz');

const checkScopes = jwtAuthz([ 'edit:coupons' ]);

// router.get('/',  couponController.findAll)
// router.post('/', couponController.create)

router.route('/')
      .get(couponController.findAll)
      .post(couponController.create)

router.route('/:id')   
      .get(couponController.findById)
      .delete( couponController.delete)
      .put( couponController.update)

router.route('/:coupon_id/offers/')
      .get(couponController.findAllOffers)
      .post( couponController.createOffer)

router.route('/:coupon_id/offers/:offer_id')
      .get(couponController.findOfferById)
      .put( couponController.updateOffer)
      .delete( couponController.deleteOffer)

module.exports = router