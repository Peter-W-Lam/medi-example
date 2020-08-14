const Coupon = require('../models/Coupon')
const {Offer} = require('../models/Offer')

module.exports = {
    findAll: (req, res) => {
        Coupon.find()
              .sort({date: -1})
              .then(coupons => res.json(coupons))
    },
    findById: (req, res) => {
        Coupon.findById(req.params.id)
              .then(coupon => res.json(coupon))
              .catch(err => res.status(404).send(err))
    },
    create: (req, res) => {
        const {company, shortDescription, companyDescription, offers, logo} = req.body

        const newCoupon = new Coupon({
            company: company, 
            shortDescription: shortDescription, 
            companyDescription: companyDescription, 
            offers: offers, 
            logo: logo
        })

        newCoupon.save()
                 .then((coupon => res.json(coupon)))
    },
    delete: (req, res) => {
        Coupon.findById(req.params.id)
              .then(item => item.remove().then(() => res.json({success: true})))
              .catch(err => res.status(404).json({success: false}))
    }, 
    update: (req, res) => {
        Coupon.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc, r) => {
            if (err) {
                res.status(404).json({success: false})
                return;
            } 
            res.status(200).json({success: true})
        })
    },
    findAllOffers: (req, res) => {
        Coupon.findById(req.params.coupon_id)
              .then(coupon => res.status(200).json(coupon.offers))
              .catch(e => res.status(404).json(e))
    },
    findOfferById: (req, res) => {

        Coupon.findById(req.params.coupon_id)
              .then(coupon => {
                  const offer = coupon.offers.id(req.params.offer_id)
                  if (offer) {
                    res.status(200).json(offer)
                  } else {
                    res.status(404).send('Error: no offer found')
                  }
              })
              .catch(e => res.status(404).json(e))
    },
    createOffer: (req, res) => {
        Coupon.findById(req.params.coupon_id)
              .then(coupon => {
                const {headline, description, termsAndConditions} = req.body
                
                const newOffer = new Offer({
                    headline: headline, 
                    description: description, 
                    termsAndConditions: termsAndConditions
                })
                coupon.offers.push(newOffer)
                coupon.save(err => {
                    if (err) res.status(400).send('Could not add offer')
                    res.status(200).json(coupon)
                })
              })
              .catch(e => res.status(404).json(e))
    },
    updateOffer: (req, res) => {
        // Offer.findById(offer)
        Coupon.findById(req.params.coupon_id)
            .then(coupon => {
                const data = req.body
                const offer = coupon.offers.id(req.params.offer_id)
                if (offer) {
                    // 
                    for (const property in data) {
                        offer[property] = data[property]
                    }
                    coupon.save(err => {
                        if (err) res.status(400).send('Error updating offer')
                        res.status(200).json(offer)
                    })
                } else {
                    res.status(404).send('Error: no offer found')
                }
            })
    },
    deleteOffer: (req, res) => {
        Coupon.findById(req.params.coupon_id)
              .then(coupon => {
                  coupon.offers.id(req.params.offer_id).remove()
                  coupon.save(err => {
                      if (err) res.status(400).send('Error removing the offer')
                      res.status(200).json({success: true})
                  })
              })
              .catch(e => res.status(404).json(e))
    }


}