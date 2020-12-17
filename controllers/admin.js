const Customer = require('../models/customer');
const User = require('../models/user');
const { sendEmailWithNodemailer } = require('../helpers/email');

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
			const emailData = {
				from: process.env.EMAIL,
				to: newCustomer.email,
				subject: `${process.env.APP_NAME} | Votre numéro de suivi est disponible`,
				text: `Merci de faire confiance à E-Comores Services pour la gestion et l'envoi de vos colis. Vous trouverez ci-dessous votre numero de suivi.`,
				html: `
				<h4>Vos informations:</h4>
				<p>Merci de faire confiance à E-Comores Services pour la gestion et l'envoi de vos colis. Vous trouverez ci-dessous votre numero de suivi.</p>
				<br/>
				<br/>
				<p><b>Nom et prénom:</b> ${newCustomer.first_name} ${newCustomer.last_name}</p>
				<p><b>Email:</b> ${newCustomer.email}</p>
				<p><b>Phone number:</b> ${newCustomer.phone_number}</p>
				<p><b>Numero de suivi:</b> ${newCustomer.tracking_number}</p>
				<p><b>Nombre de colis:</b> ${newCustomer.number_pieces}</p>
				<p><b>Adresse de destination:</b> ${newCustomer.customer_address}</p>
				<p><b>Pays:</b> ${newCustomer.country}</p>
				<p><b>Ville:</b> ${newCustomer.city}</p>
				<p><b>Type de fret:</b> ${newCustomer.transport_type}</p>
				<p><b>ID du fret:</b> ${newCustomer.freight_ID}</p>
				<p><b>Estimation d'arrivée:</b> ${newCustomer.estimated_arrival}</p>
				<hr/>
				<p>Cet email contient des informations sensitive. À ne pas partager.</p>
				<p>https://ecomores-services.com</p>
				`
			};
			sendEmailWithNodemailer(req, res, emailData);
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
