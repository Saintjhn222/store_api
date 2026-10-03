const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Products.find({
		featured: true,
	});
	res.status(200).json({ products, NbHits: products.length });
};

const getAllProducts = async (req, res) => {
	const products = await Products.find(req.query);
	res.status(200).json({ NbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
