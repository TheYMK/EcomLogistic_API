const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: 'First Name is required'
		},
		last_name: {
			type: String,
			required: 'Last Name is required'
		},
		email: {
			type: String,
			required: 'Email is required'
		},
		number_pieces: {
			type: Number,
			required: 'Number of pieces is required'
		},
		customer_address: String,
		transport_type: {
			type: String,
			required: 'Transport type is required',
			enum: [ 'fret aérien', 'fret maritime', 'fret terrestre' ]
		},
		freight_ID: {
			type: String,
			required: 'Freight ID is required'
		},
		tracking_number: {
			type: Number,
			unique: true,
			required: 'Tracking number is required',
			index: true
		},
		country: {
			type: String,
			required: 'Country is required'
		},
		city: {
			type: String,
			required: 'City name is required'
		},
		phone_number: {
			type: String,
			required: 'Phone number is required'
		},
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
