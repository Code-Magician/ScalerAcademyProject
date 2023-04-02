const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	roomNumber: {
		type: String,
		require: true,
	},
	startDateTime: {
		type: String,
		require: true,
	},
	endDateTime: {
		type: String,
		require: true,
	},
	amount: {
		type: Number,
		require: true,
	},
});

module.exports = mongoose.model("Bookings", bookingSchema);
