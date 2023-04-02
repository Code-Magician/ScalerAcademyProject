const express = require("express");
const Bookings = require("../models/bookings");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
	"/",
	[
		body("name", "Name length must be greater than 2").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body(
			"roomNumber",
			"Room number length must be greater than 1."
		).isLength({ min: 2 }),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		Bookings.create({
			name: req.body.name,
			email: req.body.email,
			roomNumber: req.body.roomNumber,
			startDateTime: req.body.startDateTime,
			endDateTime: req.body.endDateTime,
			amount: req.body.amount,
		})
			.then((booking) => res.json(booking))
			.catch((err) => {
				console.log(err);
				res.json({
					error: "Please enter a unique value",
					message: err.message,
				});
			});
	}
);

module.exports = router;
