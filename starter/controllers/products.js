const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Products.find({})
		.sort("-name price")
		.select("name")
		.limit(10);
	res.status(200).json({ nBhits: products.length, products });
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields } = req.query;
	const queryObject = {};

	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: "i" };
	}

	let result = Products.find(queryObject);

	//sort
	if (sort) {
		const splitList = sort.split(",").join(" ");
		result = result.sort(splitList);
	} else {
		result = result.sort("createdAt");
	}

	//find
	if (fields) {
		const splitList = fields.split(",").join(" ");
		result = result.select(splitList);
	}

	const products = await result;
	res.status(200).json({ NbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
