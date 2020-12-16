const Customer = require('../models/customer');
const User = require('../models/user');

exports.create = async (req, res) => {
	try {
		const customer = await Customer.findOne({ tracking_number: req.body.tracking_number }).exec();
		if (customer) {
			res.status(400).json({
				error:
					'Un utilisateur avec ce numero de suivi existe déjà. Veuillez saisir un numero de suivi different'
			});
		} else {
			const newCustomer = await new Customer(req.body).save();
			res.json(newCustomer);
		}
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		const customers = await Customer.find({}).exec();

		res.json(customers);
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};

exports.readSingle = async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id).exec();
		res.json(customer);
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};

exports.remove = async (req, res) => {
	try {
		const removedCustomer = await Customer.findByIdAndDelete(req.params.id).exec();
		res.json(removedCustomer);
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};

exports.deliveryLocation = async (req, res) => {
	try {
		const { address, country, date, time } = req.body.location;
		let newLocation = {
			address,
			country,
			date,
			time
		};
		const customer = await Customer.findById(req.params.id);

		customer.visited_locations.push(newLocation);

		customer.save();

		res.json(customer.visited_locations);
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};

exports.deliveryStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const updatedCustomer = await Customer.findByIdAndUpdate(
			req.params.id,
			{ status: status },
			{ new: true }
		).exec();
		res.json(updatedCustomer);
	} catch (err) {
		console.log(`====> ${err}`);
		res.status(400).json({
			error: err.message
		});
	}
};
