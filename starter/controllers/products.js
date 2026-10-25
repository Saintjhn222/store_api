const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Products.find({ price: { $gt: 30 } })
		.sort("price")
		.select("name price")
		.limit(10);
	res.status(200).json({ nBhits: products.length, products });
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;
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

	if (numericFilters) {
		const operatorMap = {
			">": "gt",
			">=": "gte",
			"=": "eq",
			"<": "lt",
			"<=": "lte",
		};

		const regEx = /\b(<|>|=|>=|<=)\b/g;
		const filter = numericFilters.replace(
			reqEx,
			(match) => `-${operatorMap[match]}-`,
		);
		console.log(filter);
	}
	// console.log(req.query);
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

	//skip
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({ NbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
