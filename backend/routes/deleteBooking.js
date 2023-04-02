const express = require("express");
const Bookings = require("../models/bookings");
const router = express.Router();

router.delete("/", async (req, res) => {
	const data = await Bookings.findByIdAndDelete(req.body.id);
	res.json({ Success: "Booking details are deleted" });
});

module.exports = router;
