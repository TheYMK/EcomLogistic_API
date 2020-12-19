const Customer = require('../models/customer');

exports.getCustomer = async (req, res) => {
	try {
		const customer = await Customer.findOne({ tracking_number: req.params.trackingnumber }).exec();

		res.json(customer);
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};
