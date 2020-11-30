const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
	{
		first_name: String,
		last_name: String,
		email: {
			type: String,
			required: true
		},
		number_pieces: Number,
		customer_address: String,
		transport_type: {
			type: String,
			enum: [ 'fret aérien', 'fret maritime', 'fret terrestre' ]
		},
		freight_ID: {
			type: String,
			required: true
		},
		tracking_number: {
			type: Number,
			required: true,
			index: true
		},
		country: String,
		phone_number: String,
		estimated_arrival: Date,
		status: {
			type: String,
			default: 'Not Processed',
			enum: [ 'Not Processed', 'Processing', 'Dispatched', 'Cancelled', 'Completed' ]
		},
		visited_locations: [
			{
				address: String,
				country: String,
				date: Date,
				time: String
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
