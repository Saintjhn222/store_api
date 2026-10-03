const mongoose = require("mongoose");

const connectDB = (uri) => {
	return mongoose
		.connect(uri)
		.then(() => console.log("connected to the db"))
		.catch((err) => console.log(err));
};

module.exports = connectDB;
