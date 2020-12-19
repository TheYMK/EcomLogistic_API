const Customer = require('../models/customer');

exports.trackingNumberCheck = async (req, res, next) => {
	try {
		const customer = await Customer.findOne({ tracking_number: req.params.trackingnumber }).exec();

		if (customer) {
			console.log(customer);
			next();
		} else {
			res.json({});
		}
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(401).json({
			error: 'Invalid tracking number'
		});
	}
};
