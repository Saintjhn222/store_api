require("dotenv").config();
//async errors

const express = require("express");
const app = express();

const notFound_middleware = require("./middleware/not-found");
const error_middleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
	res.send('<h1>store api</h1><a href="/api/v1/products">Products route</a>');
});

//errors
app.use(notFound_middleware);
app.use(error_middleware);

//connection
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
