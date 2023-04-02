const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());
app.use("/hrms/bookings", require("./routes/bookings"));
app.use("/hrms/fetchBookings", require("./routes/fetchBookings"));
app.use("/hrms/deleteBooking", require("./routes/deleteBooking"));
app.use("/hrms/updateBooking", require("./routes/updateBooking"));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
