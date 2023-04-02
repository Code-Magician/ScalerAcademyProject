const express = require("express");
const Bookings = require("../models/bookings");
const router = express.Router();

router.put("/", async (req, res) => {
	const booking = await Bookings.findByIdAndUpdate(
		req.body._id,
		{
			name: req.body.name,
			email: req.body.email,
			roomNumber: req.body.roomNumber,
			startDateTime: req.body.startDateTime,
			endDateTime: req.body.endDateTime,
		},
		{ new: true }
	);

	res.send(booking);
});

module.exports = router;
