const User = require('../models/User')

module.exports = {
    findAll: function(req, res) {
        User.find()
            .sort({name: -1})
            .then(users => res.json(users))
    }, 
    create: function (req, res) {
        const newUser = new User({
            name: req.body.name
        });

        newUser.save()
               .then((user => res.json(user)))
    },
    update: function(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(user => {
                user.name = req.body.name
                res.json(user)
            })
			.catch(err => res.status(422).json(err));
	},

}