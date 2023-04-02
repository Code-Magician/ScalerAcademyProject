const express = require("express");
const Bookings = require("../models/bookings");
const router = express.Router();

router.get("/", async (req, res) => {
	const data = await Bookings.find();
	res.send(data);
});

module.exports = router;
