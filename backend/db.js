const mongoose = require("mongoose");

const mongoURI =
	"mongodb+srv://warlock-perry:qazXSW12@mazoandom.0mlpj.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
	mongoose.connect(mongoURI);
	console.log("Mongo DB Connected");
};

module.exports = connectToMongo;
